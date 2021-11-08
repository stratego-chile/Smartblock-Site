import { lazy } from 'react';
import { Smartblock } from 'types';

export const PrivateRoutesMap: Smartblock.Types.RoutesMapper = {
  preferences: {
    path: '/preferences',
    public: false,
    strict: true,
    component: lazy(() => import('components/private/preferences')),
    symlinks: [
      '/settings',
      '/config',
      '/pref'
    ]
  },
};
