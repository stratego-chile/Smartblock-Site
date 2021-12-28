import { FC, FormEvent, useState, useEffect } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Smartblock } from 'types';
import { injectQueryParams } from 'helpers/route';
import { EMPTY_STRING } from 'helpers/constants';
import { Hasher } from 'helpers/hasher';
import SocialNetworks from 'components/utils/social-networks';
import SubmitButton from 'components/utils/submit-button';
import PasswordField from 'components/utils/password-field';

const SignInForm: FC<Record<string, never>> = (): JSX.Element => {

  const [state, setState] = useState<Smartblock.Types.SignInFormState>({
    username: EMPTY_STRING,
    password: EMPTY_STRING,
    rememberMe: false,
    isSubmitting: false
  });

  const [isFormValid, setFormValid] = useState<boolean>(false);

  const handleFormChange = (event: FormEvent) => {
    if (event.isTrusted) {
      const control = event.nativeEvent.target as HTMLInputElement;
      if (Object.keys(state).includes(control.id)) {
        let currentValue: string | boolean = control.value ?? EMPTY_STRING;
        if (control.type === 'checkbox') {
          currentValue = control.checked;
        }
        setState({
          ...state,
          [control.id]: currentValue
        });
      }
    }
  };

  const handleSubmit = async (event: FormEvent) =>  {
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
      state.password && state.password !== EMPTY_STRING
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [state.username, state.password]);

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
        const signUpData: Smartblock.Types.SignInForm = {
          username: Hasher.encode.Base64(state.username as string),
          password: Hasher.hash.asSHA512(state.password as string),
          rememberMe: state.rememberMe
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
    <Form onSubmit={handleSubmit} onChange={handleFormChange}>
      <Row>
        <Col className='text-center my-5'>
          <h2>Hola, nos encontramos otra vez</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId='username' label='Nombre de Usuario' className='mb-3'>
            <Form.Control type='text' placeholder='Nombre de Usuario' />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <PasswordField controlId='password' label='Contraseña' compareWith={state.password} hideToggler={false} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check id='rememberMe' type='switch' label='Recuérdame' />
        </Col>
      </Row>
      <Row className='my-4'>
        <Col className='d-grid gap-3'>
          <SubmitButton
            variant='dark'
            size='lg'
            className='btn-pill'
            disabled={!isFormValid}
            submitting={!!state.isSubmitting}
            defaultContent='Entrar' />
          <LinkContainer to={'/sign-up' + injectQueryParams({ r: false })}>
            <Button variant='outline-secondary' type='button' role='button' size='lg' className='btn-pill'>
              No tengo cuenta
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <SocialNetworks />
    </Form>
  );
};

export default SignInForm;
