import { Modules, RoutesProps } from 'types';

export const routes: RoutesProps = {
  home: {
    id: 1,
    title: 'Home',
    path: '/',
    isNavItem: true,
    module: Modules.home,
    componentName: 'Home',
  },
  homework1: {
    id: 2,
    title: 'Homework 1',
    path: '/homework1',
    isNavItem: true,
    module: Modules.homework1,
    componentName: 'Homework1',
  },
  homework2: {
    id: 3,
    title: 'Homework 2',
    path: '/homework2',
    isNavItem: true,
    module: Modules.homework2,
    componentName: 'Homework2',
  },
};
