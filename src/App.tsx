import { useEffect } from 'react';
import { Smartblock } from 'types';
import { Logger } from 'helpers/logger';
import Router from 'router';
import 'styles/_imports.sass';
import 'styles/_global.sass';

const App: Smartblock.Types.IsolatedComponent = () => {
  useEffect(() => {
    Logger.printConsoleWarnings();
  }, []);

  return (
    <Router />
  );
};

export default App;
