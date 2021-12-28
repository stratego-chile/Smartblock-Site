declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_DEPLOY_PLATFORM: 'gh-pages' | 'code-deploy';
      REACT_APP_RECAPTCHA_V3_KEY: string;
    }
  }
}

export { };
