import { FC } from 'react';

import { Task1, Task2 } from './components';

import styles from './styles.module.scss';

export const Homework2: FC = () => {
  return (
    <div>
      <Task1 />
      <Task2 />
    </div>
  );
};
