import { FC, MouseEvent, LazyExoticComponent, ComponentType } from 'react';

export namespace Smartblock.Types {
  //#region Misc
  export type IsolatedComponent = FC<Record<string | symbol, never>>;

  export type LazyComponent = LazyExoticComponent<IsolatedComponent>;

  export type SocialNetworkConfig = {
    tag: string;
    token?: string;
    timestamp?: number;
  }

  export type AlertContent = {
    title?: string;
    text?: string;
    innerHTML?: string;
    mode?: 'popup' | 'toast';
  }
  //#endregion

  //#region API client
  export type DefaultRequestHeaders = Record<string, string>;

  export type APIResponse<T = unknown> = {
    error?: {
      value: boolean;
      message: string;
      timestamp?: number;
    };
    value?: T;
  };
  //#endregion

  //#region Router
  export type RouteConfigLazy = {
    useComponent: () => LazyExoticComponent<ComponentType> | JSX.Element;
    isLazy: true;
  }

  export type RouteConfigSync = {
    useComponent: () => JSX.Element;
    isLazy?: false;
  }

  export type RouteConfig = {
    path: string;
    public: boolean;
    strict?: boolean;
    symlinks?: string[];
    data?: unknown;
  } & (RouteConfigLazy | RouteConfigSync);
  
  export type RoutesMapper = Record<string, RouteConfig>;

  export type RedirectType = {
    from: string;
    to: string;
    strict?: boolean;
  }

  export type RouteMatchParamsProps<T = Record<string, string | number>> = {
    match: {
      params: T
    }
  }
  //#endregion

  //#region Business structures
  export type SessionData = {
    token: string;
    tokenType: 'jwt' | 'sdt';
    isTokenEncoded?: boolean;
    createdAt?: number;
  }
  
  export type Session = {
    cookie: string | null;
    data: string | SessionData | null;
  }

  export type SignUpForm = {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };

  export type SignInForm = {
    username: string;
    password: string;
    rememberMe?: boolean;
  };

  export type ContactForm = {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
    captcha?: string;
  };

  export type Notification = {
    title?: string;
    text: string;
    timestamp: number;
    dismissed?: boolean;
  } & (
    {
      isLocal: boolean;
      storageAccessKey: string;
    } | {
      isLocal?: never;
      storageAccessKey?: never;
    }
  )
  //#endregion

  //#region States
  export type FormState = {
    isSubmitting?: boolean;
  };

  export type SignUpFormState = FormState & Partial<SignUpForm>;

  export type SignInFormState = FormState & Partial<SignInForm>;

  export type ContactFormState = FormState & ContactForm;

  export type SubmitButtonState = {
    awaitingResponse: boolean;
  }
  //#endregion

  //#region Props
  export type SubmitButtonProps = {
    submitting: boolean;
    defaultContent: string | JSX.Element;
    loadingContent?: string | JSX.Element;
  }

  export type PasswordFieldProps = {
    hideToggler?: boolean;
    compareWith?: string;
  }

  export type SocialNetworksProps = {
    onOptionSelection?: (options: SocialNetworkConfig) => void;
  }

  export type NotificationsProps = {
    showPanel: boolean;
    notifications?: Notification[];
    onClose: () => void;
    onNotificationsDismiss: (list: Notification[] | MouseEvent) => void 
    onNotificationDismiss: (key: number) => void;
  }

  export type NotificationsWrapperProps = {
    onNotificationsLoad: (list: Smartblock.Types.Notification[]) => void;
    onPanelClose?: (closed: boolean) => void;
    showPanel?: boolean;
  }
  //#endregion
}
