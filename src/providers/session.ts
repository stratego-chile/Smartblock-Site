import { ProvidersHelper } from 'helpers/providers';
import { Smartblock } from 'types';

export class SessionProvider {
  public static isAuthenticated (): boolean {
    return !!SessionProvider.getSession().data;
  }

  public static getSession (): Smartblock.Types.Session {
    return ProvidersHelper.getSession();
  }
}
