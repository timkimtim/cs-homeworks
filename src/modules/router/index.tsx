import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Routes } from 'react-router-dom';
import { routes as appRoutes } from 'config/routes';

import { getLazyRoutes } from './utils';

export const RouteManager = () => {
  const lazyRotes = useMemo(() => getLazyRoutes(appRoutes), []);
  const [routes, setRoutes] = useState<ReactElement[] | null>();

  useEffect(() => {
    setRoutes(lazyRotes);
  }, [lazyRotes]);

  return routes ? <Routes>{routes}</Routes> : null;
};
