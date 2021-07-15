import { FC, MouseEvent, PropsWithChildren, useState } from 'react';
import { FloatingLabelProps, FloatingLabel, Form } from 'react-bootstrap';
import PasswordFieldStyles from 'styles/modules/password-field.module.sass';

type PasswordFieldProps = {
  hideToggler?: boolean
}

const PasswordField: FC<FloatingLabelProps & PasswordFieldProps> = (props: PropsWithChildren<FloatingLabelProps & PasswordFieldProps>) => {
  const {hideToggler, ...InheritFloatingLabelProps} = props;

  const [visible, setVisible] = useState<boolean>(false);

  const handleTogglerClick = (event: MouseEvent) => {
    if (event.isTrusted) {
      event.preventDefault();
      setVisible(!visible);
    }
  };

  return (
    <FloatingLabel {...InheritFloatingLabelProps} className="mb-3">
      <Form.Control
        type={visible ? 'text' : 'password'}
        placeholder={props.controlId}
        onChange={props.onChange} />
      {
        !hideToggler
          ? <a
            className={PasswordFieldStyles.btnPasswordFieldToggler}
            onClick={handleTogglerClick}>
            {visible ? 'Ocultar' : 'Mostrar'}
          </a>
          : null
      }
    </FloatingLabel>
  );
};

export default PasswordField;
