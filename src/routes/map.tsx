import { Smartblock } from 'types';
import { PublicRoutesMap } from 'routes/public.map';
import { PrivateRoutesMap } from 'routes/private.map';
import NotFound from 'pages/errors/not-found';

export const RoutesMap: Smartblock.Types.RoutesMapper & { default: Smartblock.Types.RouteConfig } = {
  ...PublicRoutesMap,
  ...PrivateRoutesMap,
  default: {
    path: '*',
    public: true,
    useComponent: () => <NotFound />
  }
};
