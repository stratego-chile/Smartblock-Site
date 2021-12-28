import { lazy } from 'react';
import { Smartblock } from 'types';

const LazyPreferences = lazy(() => import('pages/private/preferences'));

export const PrivateRoutesMap: Smartblock.Types.RoutesMapper = {
  preferences: {
    path: '/preferences',
    public: false,
    strict: false,
    isLazy: true,
    useComponent: () => <LazyPreferences />,
    symlinks: [
      '/settings',
      '/config',
      '/pref'
    ]
  },
};
