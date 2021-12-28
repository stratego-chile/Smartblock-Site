import PasswordFieldStyles from 'styles/modules/password-field.module.sass';
import { FC, MouseEvent, PropsWithChildren, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FloatingLabelProps, FloatingLabel, Form } from 'react-bootstrap';
import { Smartblock } from 'types';
import { useStyleModules } from 'helpers/props';
import { EMPTY_STRING } from 'helpers/constants';

const PasswordField: FC<FloatingLabelProps & Smartblock.Types.PasswordFieldProps> = (props: PropsWithChildren<FloatingLabelProps & Smartblock.Types.PasswordFieldProps>): JSX.Element => {

  const { hideToggler, compareWith, ...floatingLabelProps } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(EMPTY_STRING);
  const [isMatching, setMatching] = useState<boolean>(!!compareWith);

  const handleTogglerClick = (event: MouseEvent) => {
    if (event.isTrusted) {
      event.preventDefault();
      setVisible(!visible);
    }
  };

  const captureCurrentValue = (event: ChangeEvent) => {
    if (event.isTrusted) {
      props.onChange?.call(this, event as unknown as FormEvent<HTMLInputElement>);
      const controlValue = (event.currentTarget as HTMLInputElement).value;
      setCurrentValue(controlValue);
    }
  };

  useEffect(() => {
    setMatching(currentValue === compareWith);
  }, [props.onChange, compareWith, currentValue]);

  return (
    <FloatingLabel
      {...floatingLabelProps}
      className={useStyleModules('mb-3', props.className ?? EMPTY_STRING, )} >
      <Form.Control
        type={visible ? 'text' : 'password'}
        placeholder={props.controlId}
        isInvalid={compareWith !== undefined ? !isMatching : false}
        onChange={captureCurrentValue} />
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
