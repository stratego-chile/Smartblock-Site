import { lazy } from 'react';
import { Smartblock } from 'types';
import Home from 'components/public/home';

export const PublicRoutesMap: Smartblock.Types.RoutesMapper = {
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
    component: lazy(() => import('components/public/terms-of-service')),
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
    component: lazy(() => import('components/errors/not-available')),
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
};
