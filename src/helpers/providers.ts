import axios from 'axios';
import { Smartblock } from 'types';
import { API_BASE_URL } from 'helpers/defaults';
import { Hasher } from 'helpers/hasher';
import { BrowserStorage, Cookie } from 'browdb';
import { SESSION_COOKIE_ACCESSOR, SESSION_DATA_ACCESSOR } from 'helpers/constants';

axios.interceptors.request.use(
  (config) => {
    const extendedHeaders = config.url?.includes(API_BASE_URL)
      ? ProvidersHelper.getRequestHeaders()
      : ProvidersHelper.getDefaultRequestHeaders();
    config.headers = {
      ...extendedHeaders,
      ...config.headers,
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

const SESSION_COOKIE_REF = Hasher.encode.Base64(SESSION_COOKIE_ACCESSOR);
const SESSION_DATA_REF = Hasher.encode.Base64(SESSION_DATA_ACCESSOR);

export class ProvidersHelper {
  public static HttpClient = axios;

  public static readonly LocalStorage = {
    sessionData: SESSION_DATA_REF
  };

  public static readonly keys = {
    api: {
      publicKey: process.env.REACT_APP_KEY_API_PUBLIC_TOKEN,
      privateKey: ProvidersHelper.getPrivateToken
    },
    hubspot: {
      tracking: process.env.REACT_APP_KEY_HUBSPOT_TRACKING_KEY
    },
    google: {
      places: {
        autocomplete: process.env.REACT_APP_KEY_PLACES_AUTOCOMPLETE_PUBLIC_TOKEN,
        details: process.env.REACT_APP_KEY_PLACES_AUTOCOMPLETE_PUBLIC_TOKEN
      },
      recaptcha: {
        v2: process.env.REACT_APP_KEY_GRECAPTCHA_V2_PUBLIC_TOKEN,
        v3: process.env.REACT_APP_KEY_GRECAPTCHA_V3_PUBLIC_TOKEN
      }
    }
  };

  private static _baseHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
  };

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

  public static getSession (): Smartblock.Types.Session {
    const sessionCookieRegistered = Cookie.isRegistered(SESSION_COOKIE_REF);
    const sessionCookie = Cookie.obtain(SESSION_COOKIE_REF);
    const sessionData = BrowserStorage.obtainItem<Smartblock.Types.SessionData>(SESSION_DATA_REF);

    return {
      cookie: sessionCookieRegistered ? sessionCookie : null,
      data: sessionData instanceof Object ? { ...sessionData } : sessionData
    };
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
