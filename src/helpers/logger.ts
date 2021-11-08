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

  public static printConsoleWarnings(): void {
    console.log(
      '%cHOLD UP! Are you sure what are you doing?, any action executed here could expose your data and/or break the application',
      'background: white; color: blue; font-size: x-large'
    );
    console.log(
      '%cIf you want to make a report or feedback create a new issue in https://github.com/SmartblockTech/Site/issues. Please contact us to resolve your questions.',
      'background: blue; color: white; font-size: large;'
    );
    console.log(
      '%cThis project is licensed under the MIT license terms. To access to the source code, go to https://github.com/SmartblockTech/Site',
      'background: black; color: whitesmoke; font-size: large;'
    );
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
