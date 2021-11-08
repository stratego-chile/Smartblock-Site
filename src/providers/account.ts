import { ProvidersHelper } from 'helpers/providers';
import { Smartblock } from 'types';

export type ThirdPartyAuthProvider = 'linkedin' | 'microsoft' | 'google' | 'slack';

export class AccountProvider {
  public static async checkUsername<T>(username: string): Promise<Smartblock.Types.APIResponse<T>> {
    return (await (ProvidersHelper.HttpClient.get(username))).data as Smartblock.Types.APIResponse<T>;
  }

  public static async checkEmail<T>(email: string): Promise<Smartblock.Types.APIResponse<T>> {
    return (await (ProvidersHelper.HttpClient.get(email))).data as Smartblock.Types.APIResponse<T>;
  }

  public static async request0Auth<T>(provider: ThirdPartyAuthProvider, token?: string): Promise<Smartblock.Types.APIResponse<T>> {
    return (await (ProvidersHelper.HttpClient.get(provider + token))).data as Smartblock.Types.APIResponse<T>;
  }
}
