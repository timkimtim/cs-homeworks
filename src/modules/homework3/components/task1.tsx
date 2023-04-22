import { FC, useEffect } from 'react';

import { LinkedList } from '../utils/linkedList';

export const Task1: FC = () => {
  useEffect(() => {
    const list = new LinkedList();

    list.appendRight(1);
    list.appendRight(2);
    list.appendRight(3);

    for (const value of list) {
      console.log(value);
    }
  }, []);

  return (
    <>
      <div className="title">Задание 1</div>
      <div>Смотри в консоль</div>
    </>
  );
};
