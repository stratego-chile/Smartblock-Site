import { RouteComponentProps } from 'react-router-dom';
import Home from 'components/public/home';
import { lazy } from 'react';

export type RouteConfig = {
  path: string;
  public: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  strict?: boolean;
  symlinks?: string[];
  data?: unknown;
}

export type RoutesMapper = {
  [routeId: string]: RouteConfig;
}

export class RouteAnalyzerHelper {
  private static _currentPath = () => {
    return window.location.pathname;
  }
  public static isPathEqualsTo(path: string): boolean {
    if (path.includes(':')) {
      path = path.split(':')[0];
    }
    return RouteAnalyzerHelper._currentPath().includes(path);
  }
}

export const injectQueryParams = (params: { [param: string]: string | number }): string => {
  let queryParams = '';
  for (const key in params) {
    const queryParam = `${key}=${params[key]}`;
    const unionCharacter = queryParams.length === 0 ? '?' : '&';
    queryParams += unionCharacter + queryParam;
  }
  return queryParams;
};

const RoutesMap: RoutesMapper = {
  home: {
    path: '/inicio',
    public: true,
    component: Home,
    strict: true,
    symlinks: [
      '/',
      '/start',
      '/home'
    ]
  },
  privacyPolicy: {
    path: '/privacy-policy',
    public: true,
    component: lazy(() => import('components/public/privacy-policy')),
    symlinks: [
      '/pp'
    ]
  },
  termsOfService: {
    path: '/terms-of-service',
    public: true,
    component: lazy(() => import('components/public/terms-od-service')),
    symlinks: [
      '/tos'
    ]
  },
  aboutCookies: {
    path: '/about-cookies',
    public: true,
    component: lazy(() => import('components/public/about-cookies')),
    symlinks: [
      '/ac'
    ]
  },
  notAvailable: {
    path: '/not-available',
    public: true,
    component: lazy(() => import('components/public/not-available')),
    symlinks: [
      '/under-maintenance'
    ]
  },
  signUp: {
    path: '/sign-up',
    public: true,
    strict: true,
    component: lazy(() => import('components/public/sign-up')),
    symlinks: [
      '/register',
      '/registrar',
      '/crear-cuenta'
    ]
  },
  signIn: {
    path: '/sign-in',
    public: true,
    strict: true,
    component: lazy(() => import('components/public/sign-in')),
    symlinks: [
      '/login',
      '/entrar',
      '/iniciar-sesion'
    ]
  },
  noSession: {
    path: '/403',
    public: true,
    strict: true,
    component: lazy(() => import('components/public/no-session'))
  },
  default: {
    path: '**',
    public: true,
    component: lazy(() => import('components/public/not-found'))
  }
};

export default RoutesMap;
