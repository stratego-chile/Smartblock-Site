import { Smartblock } from 'types';
import Home from 'pages/public/home';
import PrivacyPolicy from 'pages/public/privacy-policy';
import TermsOfService from 'pages/public/terms-of-service';
import AboutCookies from 'pages/public/about-cookies';
import NotAvailable from 'pages/errors/not-available';
import OutsideRedirect from 'components/utils/outside-redirect';

export const PublicRoutesMap: Smartblock.Types.RoutesMapper = {
  home: {
    path: '/inicio',
    public: true,
    useComponent: () => <Home />,
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
    useComponent: () => <PrivacyPolicy />,
    symlinks: [
      '/pp'
    ]
  },
  termsOfService: {
    path: '/terms-of-service',
    public: true,
    useComponent: () => <TermsOfService />,
    symlinks: [
      '/tos'
    ]
  },
  aboutCookies: {
    path: '/about-cookies',
    public: true,
    useComponent: () => <AboutCookies />,
    symlinks: [
      '/ac'
    ]
  },
  notAvailable: {
    path: '/not-available',
    public: true,
    useComponent: () => <NotAvailable />,
    symlinks: [
      '/under-maintenance'
    ]
  },
  signUp: {
    path: '/sign-up',
    public: true,
    strict: true,
    isLazy: true,
    useComponent: () => <OutsideRedirect useAppPath path='/sign-up' />,
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
    isLazy: true,
    useComponent: () => <OutsideRedirect useAppPath path='/sign-in' />,
    symlinks: [
      '/login',
      '/entrar',
      '/iniciar-sesion'
    ]
  },
};
