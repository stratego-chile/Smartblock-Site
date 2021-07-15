import 'styles/_global.sass';
import { BrowserRouter as RouterWrapper } from 'react-router-dom';
import { Smartblock } from 'types';
import Router from 'router';

const App: Smartblock.Types.IsolatedComponent = () => {
  return <>
    <RouterWrapper>
      <Router />
    </RouterWrapper>
  </>;
};

export default App;
