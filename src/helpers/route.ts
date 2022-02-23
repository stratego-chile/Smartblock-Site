export class RouteAnalyzerHelper {

  private static _currentPath = () => window.location.pathname;

  static isPathEqualsTo(path: string): boolean {
    if (path.includes(':')) {
      path = path.split(':').pop() as string;
    }
    return RouteAnalyzerHelper._currentPath().includes(path);
  }
}

export const determineBaseUrlContext = () => {
  const { host } = window.location;
  if (host.includes('beta.') || host.includes('localhost')) {
    return 'https://beta.app.smartblock.cl';
  }
  return 'https://app.smartblock.cl';
};

export const injectQueryParams = (params: { [param: string]: string | number | boolean }): string => {
  let queryParams = '';
  for (const key in params) {
    const queryParam = [key, String(params[key])].join('=');
    const unionCharacter = queryParams.length === 0 ? '?' : '&';
    queryParams += unionCharacter + queryParam;
  }
  return queryParams;
};
