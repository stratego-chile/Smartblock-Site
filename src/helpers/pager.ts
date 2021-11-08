import { basePageTitle } from 'helpers/defaults';

export class Title {
  public static set(text?: string, baseTitle = basePageTitle): void {
    document.title = text ? text + ' - ' + baseTitle : baseTitle;
  }
}
