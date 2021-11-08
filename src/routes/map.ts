import { lazy } from 'react';
import { Smartblock } from 'types';
import { PublicRoutesMap } from 'routes/public.map';
import { PrivateRoutesMap } from 'routes/private.map';

export const RoutesMap: Smartblock.Types.RoutesMapper & { default: Smartblock.Types.RouteConfig } = {
  ...PublicRoutesMap,
  ...PrivateRoutesMap,
  default: {
    path: '**',
    public: true,
    component: lazy(() => import('components/errors/not-found'))
  }
};
