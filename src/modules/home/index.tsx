import { FC } from 'react';

import styles from './home.module.scss';

export const Home: FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.title_wrapper}>
        <p className={styles.glitch}>
          <span aria-hidden="true">Курс Computer Science во frontend</span>
          Курс Computer Science во frontend
          <span aria-hidden="true">Курс Computer Science во frontend</span>
        </p>
      </div>
      <div className={styles.text}>Качай базу</div>
    </div>
  );
};
