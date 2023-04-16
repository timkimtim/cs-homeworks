export enum Modules {
  home = 'home',
  homework1 = 'homework1',
  homework2 = 'homework2',
  homework3 = 'homework3',
}
export interface RootRouteProps {
  id: number;
  title: string;
  path: string;
  isNavItem?: boolean;
  module: Modules;
  componentName: string;
}
export interface RoutesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: RootRouteProps;
}
