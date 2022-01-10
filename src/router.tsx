import { Suspense, lazy, useEffect, useState } from 'react';
import { RouteObject } from 'react-router';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { SessionProvider } from 'providers/session';
import { RoutesMap } from 'routes/map';
import { Smartblock } from 'types';
import SuspenseFallback from 'components/utils/suspense-fallback';

const LazyNoSession = lazy(() => import('pages/errors/no-session'));

const AppRoutes: Smartblock.Types.IsolatedComponent = (): JSX.Element => {

  const [routes, setRoutes] = useState<RouteObject[]>([]);

  const getRoutesAndRedirects = () => {
    const $routes: RouteObject[] = [];
    for (const routeId in RoutesMap) {
      const route = RoutesMap[routeId];
      if (!route.path.includes('*')) {
        const routeConfig: RouteObject = {
          path: route.path,
          caseSensitive: false,
          element: route.isLazy
            ? <Suspense fallback={SuspenseFallback()}>
              {route.useComponent()}
            </Suspense>
            : route.useComponent()
        };
        if (route.strict) {
          if (route.public) {
            if (SessionProvider.isAuthenticated()) {
              routeConfig.element = <Navigate to={RoutesMap.dashboard.path} />;
            }
          } else {
            if (!SessionProvider.isAuthenticated()) {
              routeConfig.element = <Suspense fallback={SuspenseFallback()}>
                <LazyNoSession />
              </Suspense>;
            }
          }
        }
        $routes.push(routeConfig);
        route.symlinks?.forEach(symlink => {
          $routes.push({
            path: symlink,
            caseSensitive: false,
            element: <Navigate replace to={route.path} />
          });
        });
      }
    }
    return $routes;
  };

  useEffect(() => { setRoutes(getRoutesAndRedirects()); }, []);

  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      {routes.map((route, key) => <Route {...route} element={route.element as JSX.Element} key={key} />)}
      { /* Default route */ }
      <Route
        path={RoutesMap.default.path}
        element={RoutesMap.default.useComponent()} />
    </Routes>
  </BrowserRouter>;
};

export default AppRoutes;
