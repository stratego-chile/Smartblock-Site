import { ProvidersHelper } from 'helpers/providers';
import { Smartblock } from 'types';

export type ThirdPartyAuthProvider = 'linkedin' | 'microsoft' | 'google' | 'slack';

export class AccountProvider {
  public static async checkUsername<T = Smartblock.Types.APIResponse>(username: string): Promise<T> {
    return (await (ProvidersHelper.HttpClient.get(username))).data as T;
  }

  public static async checkEmail<T = Smartblock.Types.APIResponse>(email: string): Promise<T> {
    return (await (ProvidersHelper.HttpClient.get(email))).data as T;
  }

  public static async request0Auth<T = Smartblock.Types.APIResponse>(provider: ThirdPartyAuthProvider, token?: string): Promise<T> {
    return (await (ProvidersHelper.HttpClient.get(provider + token))).data as T;
  }
}
