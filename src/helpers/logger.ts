export enum LoggerMode {
  log = 'log',
  warn = 'warn',
  error = 'error',
}

export type LoggerConfig = {
  mode: LoggerMode
}

export const LoggerModeHelper: { [key in LoggerMode]: (...data: Array<unknown>) => void } = {
  log: console.log,
  warn: console.warn,
  error: console.error
};

export class Logger {

  private _config: LoggerConfig = {
    mode: LoggerMode.log
  };

  constructor(
    config?: LoggerConfig
  ) {
    if (config) {
      this._config = Object.assign(
        this._config,
        config
      );
    }
  }

  public put(...contents: Array<unknown>): void {
    LoggerModeHelper[this._config.mode](contents.join(' '));
  }
}

export class StaticLogger {
  public static put(...contents: Array<unknown>): void {
    new Logger().put(contents);
  }

  public static warn(...contents: Array<unknown>): void {
    new Logger({ mode: LoggerMode.warn }).put(contents);
  }

  public static error(...contents: Array<unknown>): void {
    new Logger({ mode: LoggerMode.error }).put(contents);
  }
}
