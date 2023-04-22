import { FC } from 'react';
import { decode, encode, Schema } from 'modules/homework2/utils';

import styles from '../styles.module.scss';

export const Task2: FC = () => {
  const schema: Schema = [
    [3, 'number'], // 3 бита число
    [2, 'number'], // 2 бита число
    [1, 'boolean'], // 1 бит логический
    [1, 'boolean'], // 1 бит логический
    [16, 'ascii'], // 16 бит 2 аски символа
  ];

  const data = encode([2, 3, true, false, 'ab'], schema);
  console.log(data);
  console.log(decode(data, schema)); // [2, 3, true, false, 'ab']
  return (
    <>
      <div className="title mt-10">Задание 2 и 3</div>
      <div className={styles.exercise_block}>Смотри в консоль</div>
    </>
  );
};
