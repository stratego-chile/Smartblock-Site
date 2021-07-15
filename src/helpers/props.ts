export const useStyleModules = (...classes: string[]): string => classes.length > 1 ? classes.join(' ') : classes.join();

export const generateQueryParams = (params: { [key: string]: string | number | boolean }): string => {
  let result = '';
  for (const param in params) {
    result += (result.length < 1 ? '?' : '&') + param + '=' + encodeURIComponent(params[param]);
  }
  return result;
};
