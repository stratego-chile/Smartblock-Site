import axios from 'axios';
import { Smartblock } from 'types';
import { apiBaseUrl } from 'helpers/defaults';
import { Hasher } from 'helpers/hasher';

axios.interceptors.request.use(
  (config) => {
    const extendedHeaders = config.url?.includes(apiBaseUrl)
      ? ProvidersHelper.getRequestHeaders()
      : ProvidersHelper.getDefaultRequestHeaders();
    config.headers = {
      ...config.headers,
      ...extendedHeaders
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.resolve({
      error: {
        value: true,
        reason: error,
        message: 'Rejected Request',
        timestamp: Date.now()
      },
      value: undefined
    } as Smartblock.Types.APIResponse<undefined>);
  }
);

export class ProvidersHelper {
  public static HttpClient = axios;

  public static readonly LocalStorage = {
    sessionData: 'session'
  }

  public static readonly keys = {
    api: {
      publicKey: process.env.REACT_APP_KEY_API_PUBLIC_TOKEN ?? '',
      privateKey: ProvidersHelper.getPrivateToken
    },
    hubspot: {
      tracking: process.env.REACT_APP_KEY_HUBSPOT_TRACKING_KEY
    },
    google: {
      places: {
        autocomplete: process.env.REACT_APP_KEY_PLACES_AUTOCOMPLETE_PUBLIC_TOKEN ?? '',
        details: process.env.REACT_APP_KEY_PLACES_AUTOCOMPLETE_PUBLIC_TOKEN ?? ''
      },
      recaptcha: {
        v2: process.env.REACT_APP_KEY_GRECAPTCHA_V2_PUBLIC_TOKEN ?? '',
        v3: process.env.REACT_APP_KEY_GRECAPTCHA_V3_PUBLIC_TOKEN ?? ''
      }
    }
  }

  private static _baseHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  }

  public static getRequestHeaders(): Smartblock.Types.DefaultRequestHeaders {
    return {
      ...ProvidersHelper._baseHeaders,
      Lang: 'en-US',
      Environment: process.env.NODE_ENV
    };
  }

  public static getDefaultRequestHeaders(): (typeof ProvidersHelper._baseHeaders) {
    return ProvidersHelper._baseHeaders;
  }

  public static getPrivateToken(): string | null {
    const rawSessionData = Hasher.decode.Base64(localStorage.getItem(ProvidersHelper.LocalStorage.sessionData) ?? '');
    if (rawSessionData) {
      const sessionData = JSON.parse(rawSessionData);
      return sessionData.token;
    }
    return null;
  }
}
