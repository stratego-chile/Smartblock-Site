import { FormEvent, useState, useEffect } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Hasher } from 'helpers/hasher';
import { Smartblock } from 'types';
import PasswordField from 'components/utils/password-field';
import SocialNetworks from 'components/utils/social-networks';
import SubmitButton from 'components/utils/submit-button';
import { injectQueryParams } from 'helpers/route';
import { EMPTY_STRING } from 'helpers/constants';
import { Logger } from 'helpers/logger';

const SignUpForm: Smartblock.Types.IsolatedComponent = (): JSX.Element => {
  const [state, setState] = useState<Smartblock.Types.SignUpFormState>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    isSubmitting: false
  });
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const handleFormChange = (event: FormEvent) => {
    if (event.isTrusted) {
      const control = event.nativeEvent.target as HTMLInputElement;
      if (Object.keys(state).includes(control.id)) {
        setState({
          ...state,
          [control.id]: control.value ?? EMPTY_STRING
        });
      }
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (event.isTrusted) {
      event.preventDefault();
      setState({
        ...state,
        isSubmitting: true
      });
    }
  };

  useEffect(() => {
    if (
      state.username && state.username !== EMPTY_STRING &&
      state.email && state.email !== EMPTY_STRING &&
      state.password && state.password !== EMPTY_STRING &&
      state.passwordConfirm && state.passwordConfirm !== EMPTY_STRING
    ) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    } else {
      setFormValid(false);
    }
  }, [state.username, state.email, state.password, state.passwordConfirm]);

  useEffect(() => {
    if (state.isSubmitting) {
      const fakeRequest = async () => {
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            resolve(false);
          }, 3000);
        });
      };
      if (isFormValid) {
        const signUpData: Smartblock.Types.SignUpForm = {
          username: Hasher.encode.Base64(state.username as string),
          email: Hasher.encode.Base64(state.email as string),
          password: Hasher.hash.asSHA512(state.password as string),
          passwordConfirm: Hasher.hash.asSHA512(state.passwordConfirm as string)
        };
        fakeRequest().then(isSubmitting => {
          console.log(signUpData);
          setState({
            ...state,
            isSubmitting
          });
        });
      } else {
        setState({
          ...state,
          isSubmitting: false
        });
      }
    }
  }, [state.isSubmitting]);

  return (
    <Form onSubmit={handleFormSubmit} onChange={handleFormChange}>
      <Row>
        <Col className='text-center my-5'>
          <h2>Crea una cuenta gratuita</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId='username' label='Nombre de usuario' className='mb-3'>
            <Form.Control type='text' placeholder='Nombre de usuario' />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId='email' label='Correo Electrónico' className='mb-3'>
            <Form.Control type='email' placeholder='Correo Electrónico' />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <PasswordField controlId='password' label='Contraseña' hideToggler={!state.password} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PasswordField controlId='passwordConfirm' label='Confirma tu contraseña' compareWith={state.password} hideToggler={false} hidden={!state.password} />
        </Col>
      </Row>
      <Row className='my-4'>
        <Col className='d-grid gap-3'>
          <SubmitButton
            variant='dark'
            size='lg'
            className='btn-pill'
            defaultContent='Registrarme'
            disabled={!isFormValid}
            submitting={!!state.isSubmitting} />
          <LinkContainer to={'/sign-in' + injectQueryParams({ r: true })}>
            <Button variant='outline-secondary' type='button' role='button' size='lg' className='btn-pill'>
              Ya tengo cuenta
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <SocialNetworks onOptionSelection={(config) => { new Logger().put(JSON.stringify(config)); }} />
    </Form>
  );
};

export default SignUpForm;
