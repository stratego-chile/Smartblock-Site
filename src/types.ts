import { FC, MouseEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export namespace Smartblock.Types {
  //#region Misc
  export type IsolatedComponent = FC<Record<string | symbol, never>>;

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
  export type RouteConfig = {
    path: string;
    public: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    strict?: boolean;
    symlinks?: string[];
    data?: unknown;
  }
  
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
  export type SignUpForm = {
    username?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  };

  export type SignInForm = {
    username?: string;
    password?: string;
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

  export type SignUpFormState = FormState & SignUpForm;

  export type SignInFormState = FormState & SignInForm;

  export type ContactFormState = FormState & ContactForm;

  export type SubmitButtonState = {
    awaitingResponse: boolean;
  }
  //#endregion

  //#region Props
  export type SubmitButtonProps = {
    submitting: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultContent: string | JSX.Element | React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadingContent?: string | JSX.Element | React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  }

  export type PasswordFieldProps = {
    hideToggler?: boolean
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
