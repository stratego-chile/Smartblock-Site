import { FC, useEffect, useState, Suspense, lazy } from 'react';
import { Switch, Route, Redirect, RouteProps, HashRouter, BrowserRouter } from 'react-router-dom';
import { SessionProvider } from 'providers/session';
import { RoutesMap } from 'routes/map';
import { Smartblock } from 'types';
import SuspenseFallback from 'components/utils/suspense-fallback';

export const PublicRoute: FC<RouteProps> = (props) => {
  if (SessionProvider.isAuthenticated()) {
    return <Redirect to={RoutesMap.dashboard.path} />;
  } else {
    return <Route {...props} />;
  }
};

export const PrivateRoute: FC<RouteProps> = (props) => {
  if (!SessionProvider.isAuthenticated()) {
    return <Route
      {...props}
      component={lazy(() => import('components/errors/no-session'))} />;
  } else {
    return <Route {...props} />;
  }
};

const Routes: Smartblock.Types.IsolatedComponent = () => {

  const [routes, setRoutes] = useState<Smartblock.Types.RouteConfig[]>([]);
  const [redirects, setRedirects] = useState<Smartblock.Types.RedirectType[]>([]);

  const getRoutes = (): JSX.Element[] => routes.filter(
    route => route.path !== '**' // Prevents load of the default route. This allows the rendering of the redirects declared bellow
  ).map(
    (route, index) =>
      !route.strict
        ? <Route
          exact
          key={index}
          path={route.path}
          component={route.component} />
        : route.public
          ? <PublicRoute
            exact
            key={index}
            path={route.path}
            component={route.component} />
          : <PrivateRoute
            exact
            key={index}
            path={route.path}
            component={route.component} />
  );

  const getSymlinks = (): JSX.Element[] => redirects.map(
    (redirect: Smartblock.Types.RedirectType, index: string | number) =>
      <Redirect
        exact
        key={index}
        from={redirect.from}
        to={redirect.to}
        strict={redirect.strict} />
  );

  const getRoutesAndRedirects = () => {
    const $routes: Smartblock.Types.RouteConfig[] = [];
    const $redirects: Smartblock.Types.RedirectType[] = [];
    for (const routeId in RoutesMap) {
      const routeConfig = RoutesMap[routeId];
      $routes.push(routeConfig);
      routeConfig?.symlinks?.forEach(
        symlink => $redirects.push({
          from: symlink,
          to: routeConfig.path,
          strict: routeConfig.strict
        })
      );
    }
    setRoutes($routes);
    setRedirects($redirects);
  };

  useEffect(() => getRoutesAndRedirects(), []);

  const RouterInnerConfig = <Suspense fallback={SuspenseFallback()}>
    <Switch>
      {getRoutes()}
      {getSymlinks()}
      { /* Default route */ }
      <Route
        path={RoutesMap.default.path}
        component={RoutesMap.default.component} />
    </Switch>
  </Suspense>;

  return process.env.REACT_APP_DEPLOY_PLATFORM === 'code-deploy'
    ? <HashRouter basename={process.env.PUBLIC_URL}>
      {RouterInnerConfig}  
    </HashRouter>
    : <BrowserRouter basename={process.env.PUBLIC_URL}>
      {RouterInnerConfig}
    </BrowserRouter>;
};

export default Routes;
