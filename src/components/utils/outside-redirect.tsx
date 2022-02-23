import { determineBaseUrlContext } from 'helpers/route';
import { FC, useLayoutEffect } from 'react';
import SuspenseFallback from './suspense-fallback';

type OutsideRedirectProps = {
  url: string;
  path?: never;
  useAppPath?: never;
} | {
  url?: never;
  path: string;
  useAppPath?: true;
};

const OutsideRedirect: FC<OutsideRedirectProps> = (props) => {
  const { url, path, useAppPath } = props;

  useLayoutEffect(() => {
    if (useAppPath && path) {
      window.location.replace(determineBaseUrlContext() + path);
    } else if (url) {
      window.location.replace(url);
    }
  }, [url, path, useAppPath]);

  return (SuspenseFallback());
};

export default OutsideRedirect;
