import PasswordFieldStyles from 'styles/modules/password-field.module.sass';
import { FC, MouseEvent, PropsWithChildren, useState } from 'react';
import { FloatingLabelProps, FloatingLabel, Form } from 'react-bootstrap';
import { Smartblock } from 'types';
import { useStyleModules } from 'helpers/props';

const PasswordField: FC<FloatingLabelProps & Smartblock.Types.PasswordFieldProps> = (props: PropsWithChildren<FloatingLabelProps & Smartblock.Types.PasswordFieldProps>) => {

  const { hideToggler, ...floatingLabelProps } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const handleTogglerClick = (event: MouseEvent) => {
    if (event.isTrusted) {
      event.preventDefault();
      setVisible(!visible);
    }
  };

  return (
    <FloatingLabel {...floatingLabelProps} className={useStyleModules('mb-3', props.className ?? '')}>
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
