import { lazy } from 'react';
import { Route } from 'react-router-dom';
import { RoutesProps } from 'types';

import { formatRoutesToArray } from './formatRoutesToArray';

export default function getLazyRoutes(routes: RoutesProps) {
  const routesArr = formatRoutesToArray(routes).map(({ path, id, title, module: configModule, componentName }) => {
    const Component = lazy(() =>
      import(`modules/${configModule}`).then((module) => ({ default: module[componentName] })),
    );

    return <Route path={path} element={<Component title={title} />} key={id} />;
  });
  return routesArr.flat();
}
