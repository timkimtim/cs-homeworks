import { RootRouteProps, RoutesProps } from 'types';

export const formatRoutesToArray = (routes: RoutesProps): RootRouteProps[] => {
  return Object.values(routes).map((route) => route);
};
