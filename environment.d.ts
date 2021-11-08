declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_DEPLOY_PLATFORM: 'gh-pages' | 'code-deploy';
    }
  }
}

export { };
