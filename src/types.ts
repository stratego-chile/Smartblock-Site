import { FC } from 'react';

export namespace Smartblock.Types {
  export type IsolatedComponent = FC<Record<string, never>>;

  export type DefaultRequestHeaders = {
    [key: string]: string
  }

  export type APIResponse<T = unknown> = {
    error?: {
      value: boolean,
      message: string,
      timestamp?: number
    },
    value?: T
  }
}
