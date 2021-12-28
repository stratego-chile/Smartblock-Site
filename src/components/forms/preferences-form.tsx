import { FC, useState } from 'react';
import { Form } from 'react-bootstrap';

type PreferencesFormState = {
  onSubmit?: () => void;
}

const PreferencesForm: FC = (props) => {

  const { children } = props;

  const [formState, setFormState] = useState<PreferencesFormState>({

  });

  return (
    <Form>

    </Form>
  );
};

export default PreferencesForm;
