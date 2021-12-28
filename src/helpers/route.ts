export class RouteAnalyzerHelper {

  private static _currentPath = () => window.location.pathname;

  public static isPathEqualsTo(path: string): boolean {
    if (path.includes(':')) {
      path = path.split(':').pop() as string;
    }
    return RouteAnalyzerHelper._currentPath().includes(path);
  }
}

export const injectQueryParams = (params: { [param: string]: string | number | boolean }): string => {
  let queryParams = '';
  for (const key in params) {
    const queryParam = [key, String(params[key])].join('=');
    const unionCharacter = queryParams.length === 0 ? '?' : '&';
    queryParams += unionCharacter + queryParam;
  }
  return queryParams;
};
