import { FC, FormEvent, useState, useEffect } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Hasher } from 'helpers/hasher';
import { Smartblock } from 'types';
import PasswordField from 'components/utils/password-field';
import SocialNetworks from 'components/utils/social-networks';
import SubmitButton from 'components/utils/submit-button';
import { injectQueryParams } from 'helpers/route';

const SignUpForm: FC<Record<string, never>> = () => {
  const [state, setState] = useState<Smartblock.Types.SignUpFormState>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    isSubmitting: false
  });

  const handleFormChange = (event: FormEvent) => {
    if (event.isTrusted) {
      const control = event.nativeEvent.target as HTMLInputElement;
      if (Object.keys(state).includes(control.id)) {
        const handledValue = control.id.toLowerCase().includes('password')
          ? (control.value ? Hasher.hash.asSHA512(control.value) : '')
          : control.id.toLowerCase().includes('email')
            ? Hasher.encode.Base64(control.value)
            : '';
        setState({
          ...state,
          [control.id]: handledValue
        });
      }
    }
  };

  const handleFormSubmit = async (event: FormEvent) => {
    if (event.isTrusted) {
      event.preventDefault();
      setState({
        ...state,
        isSubmitting: true
      });
    }
  };

  useEffect(() => {
    if (state.isSubmitting) {
      const fakeRequest = async () => {
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            resolve(false);
          }, 3000);
        });
      };
      fakeRequest().then(isSubmitting => {
        setState({
          ...state,
          isSubmitting
        });
      });
    }
  }, [state.isSubmitting]);

  return (
    <Form onSubmit={handleFormSubmit} onChange={handleFormChange}>
      <Row>
        <Col className="text-center my-5">
          <h2>Crea una cuenta gratuita</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="username" label="Nombre de usuario" className="mb-3">
            <Form.Control type="text" placeholder="Nombre de usuario" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel controlId="email" label="Correo Electrónico" className="mb-3">
            <Form.Control type="email" placeholder="Correo Electrónico" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <PasswordField controlId="password" label="Contraseña" hideToggler={!state.password} />
        </Col>
      </Row>
      <Row>
        <Col>
          <PasswordField controlId="passwordConfirm" label="Confirma tu contraseña" hideToggler={true} />
        </Col>
      </Row>
      <Row className="my-4">
        <Col className="d-grid gap-3">
          <SubmitButton
            variant="dark"
            size="lg"
            className="btn-pill"
            defaultContent="Registrarme"
            submitting={!!state.isSubmitting} />
          <LinkContainer to={'/sign-in' + injectQueryParams({ r: true })}>
            <Button variant="outline-secondary" type="button" role="button" size="lg" className="btn-pill">
              Ya tengo cuenta
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <SocialNetworks onOptionSelection={(config) => { console.log(config); }} />
    </Form>
  );
};

export default SignUpForm;
