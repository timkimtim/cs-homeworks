import { FC, useEffect } from 'react';

import { createBitAccessor } from './utils';

export const Homework1: FC = () => {
  const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

  useEffect(() => {
    console.log(bitAccessor.get(0, 1)); // 1
    console.log(bitAccessor.get(1, 1)); // 0

    console.log(bitAccessor.set(0, 1, 0)); //
    console.log(bitAccessor.get(0, 1)); // 0
  }, [bitAccessor]);

  return <div className="title">Смотри в консоль</div>;
};
