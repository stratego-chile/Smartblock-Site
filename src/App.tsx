import { useEffect } from 'react';
import { Smartblock } from 'types';
import Router from 'router';
import 'styles/_imports.sass';
import 'styles/_global.sass';
import { Logger } from 'helpers/logger';

const App: Smartblock.Types.IsolatedComponent = () => {
  useEffect(() => {
    Logger.printConsoleWarnings();
  }, []);

  return (
    <Router />
  );
};

export default App;
