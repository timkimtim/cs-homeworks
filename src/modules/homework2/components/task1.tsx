import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { CatImage } from 'assets/images';

import styles from '../styles.module.scss';

export const Task1: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState(new Image());

  const drawOriginalImage = useCallback((img: HTMLImageElement) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(img, 0, 0);
    } else {
      throw new Error('Canvas is empty');
    }
  }, []);

  const invert = () => {
    drawOriginalImage(image);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const imageData = ctx!.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      const { data } = imageData;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }

      ctx!.putImageData(imageData, 0, 0);
    } else {
      throw new Error('Canvas is empty');
    }
  };

  const grayscale = () => {
    drawOriginalImage(image);
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const imageData = ctx!.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      const { data } = imageData;

      for (let i = 0; i < data.length; i += 4) {
        const gray = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
        // eslint-disable-next-line no-multi-assign
        data[i] = data[i + 1] = data[i + 2] = gray;
      }

      ctx!.putImageData(imageData, 0, 0);
    } else {
      throw new Error('Canvas is empty');
    }
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.src = src;

        img.onload = () => {
          resolve(img);
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  const setupCanvas = useCallback(async () => {
    const img = await loadImage(CatImage);
    setImage(img);
    if (canvasRef.current) {
      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;

      drawOriginalImage(img);
    } else {
      throw new Error('Canvas is empty');
    }
  }, [drawOriginalImage]);

  useEffect(() => {
    if (canvasRef.current) {
      setupCanvas();
    }
  }, [setupCanvas]);

  return (
    <>
      <div className="title">Задание 1</div>
      <div className={styles.exercise_block}>
        <canvas width="200" height="100" ref={canvasRef} />
        <div className={styles.btn_wrapper}>
          <button type="button" className={styles.btn} onClick={() => drawOriginalImage(image)}>
            Original
          </button>
          <button type="button" className={styles.btn} onClick={grayscale}>
            Grayscale
          </button>
          <button type="button" className={styles.btn} onClick={invert}>
            Invert
          </button>
        </div>
      </div>
    </>
  );
};
