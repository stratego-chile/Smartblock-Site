import { BASE_PAGE_TITLE } from 'helpers/defaults';

export class Title {
  public static set(text?: string, baseTitle = BASE_PAGE_TITLE): void {
    document.title = text ? text + ' - ' + baseTitle : baseTitle;
  }
}
