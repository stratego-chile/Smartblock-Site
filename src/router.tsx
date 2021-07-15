import { FC, useEffect, useState, Suspense } from 'react';
import { Switch, Route, Redirect, RouteProps} from 'react-router-dom';
import { injectQueryParams, RouteConfig} from 'helpers/routes';
import { Smartblock } from 'types';
import { Hasher } from 'helpers/hasher';
import { SessionProvider } from 'providers/session';
import SuspenseFallback from 'components/utils/suspense-fallback';
import TopBar from 'components/shared/top-bar';
import Footer from 'components/shared/footer';
import RoutesMap from 'helpers/routes';

export type RedirectType = {
  from: string;
  to: string;
  strict?: boolean;
}

export const PublicRoute: FC<RouteProps> = (props) => <Route {...props} />;

export const PrivateRoute: FC<RouteProps> = (props) => {
  if (!SessionProvider.isAuthenticated()) {
    return <Redirect to={RoutesMap.noSession.path + injectQueryParams({
      resource: Hasher.encode.Base64(props.path?.toString() as string)
    })} />;
  } else {
    return <Route {...props} />;
  }
};

const Routes: Smartblock.Types.IsolatedComponent = () => {

  const [routes, setRoutes] = useState<RouteConfig[]>([]);
  const [redirects, setRedirects] = useState<RedirectType[]>([]);

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
    (redirect: RedirectType, index: string | number) =>
      <Redirect
        exact
        key={index}
        from={redirect.from}
        to={redirect.to}
        strict={redirect.strict} />
  );

  const getRoutesAndRedirects = () => {
    const $routes: RouteConfig[] = [];
    const $redirects: RedirectType[] = [];
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

  return (
    <Suspense fallback={SuspenseFallback()}>
      <TopBar />
      <Switch>
        {getRoutes()}
        {getSymlinks()}
        { /* Default route */ }
        <Route
          path={RoutesMap.default.path}
          component={RoutesMap.default.component} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default Routes;
