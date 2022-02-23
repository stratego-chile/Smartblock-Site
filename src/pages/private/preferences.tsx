import PrivateLayout from 'components/utils/private-layout';
import type { Smartblock } from 'types';

const Preferences: Smartblock.Types.IsolatedComponent = (): JSX.Element => {
  return (
    <PrivateLayout pageTitle='Preferencias'>
      <h1>Preferencias</h1>
    </PrivateLayout>
  );
};

export default Preferences;
