import { ProvidersHelper } from 'helpers/providers';
import { Smartblock } from 'types';

export class NotificationsProvider {
  public async getNotifications<T>(): Promise<Smartblock.Types.APIResponse<T>> {
    return (await (ProvidersHelper.HttpClient.get(''))).data as Smartblock.Types.APIResponse<T>;
  }

  public async dismissNotifications<T>(list: Smartblock.Types.Notification[]): Promise<Smartblock.Types.APIResponse<T>> {
    return (await (ProvidersHelper.HttpClient.put('', list))).data as Smartblock.Types.APIResponse<T>;
  }
}
