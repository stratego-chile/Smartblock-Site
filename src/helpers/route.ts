export class RouteAnalyzerHelper {
  private static _currentPath = () => {
    return window.location.pathname;
  }
  public static isPathEqualsTo(path: string): boolean {
    if (path.includes(':')) {
      path = path.split(':')[0];
    }
    return RouteAnalyzerHelper._currentPath().includes(path);
  }
}

export const injectQueryParams = (params: { [param: string]: string | number | boolean }): string => {
  let queryParams = '';
  for (const key in params) {
    const queryParam = `${key}=${params[key]}`;
    const unionCharacter = queryParams.length === 0 ? '?' : '&';
    queryParams += unionCharacter + queryParam;
  }
  return queryParams;
};
