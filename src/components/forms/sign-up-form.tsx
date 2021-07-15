import { FC, FormEvent, useState } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faLinkedin, faMicrosoft, faSlack } from '@fortawesome/free-brands-svg-icons';
import { generateQueryParams, useStyleModules } from 'helpers/props';
import { LinkContainer } from 'react-router-bootstrap';
import { Hasher } from 'helpers/hasher';
import PasswordField from 'components/utils/password-field';
import SocialNetworksStyles from 'styles/modules/social-networks.module.sass';

type SmartblockSignUpState = {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  isSubmitting?: boolean;
}

const SignUpForm: FC<Record<string, never>> = () => {

  const [state, setState] = useState<SmartblockSignUpState>({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    isSubmitting: false
  });

  const handleRegularSignUpSubmit = async (event: FormEvent) => {
    if (event.isTrusted) {
      event.preventDefault();
      setTimeout(() => {
        setState({
          ...state,
          isSubmitting: false
        });
      }, 5000);
      setState({
        ...state,
        isSubmitting: true
      });
    }
  };

  const handleFormChange = (event: FormEvent) => {
    if (event.isTrusted) {
      const control = event.nativeEvent.target as HTMLInputElement;
      if (Object.keys(state).includes(control.id)) {
        const handledValue = control.id.toLowerCase().includes('password')
          ? (control.value ? Hasher.create.SHA512(control.value) : '')
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

  return (
    <Form onSubmit={handleRegularSignUpSubmit} onChange={handleFormChange}>
      <Row>
        <Col>
          <code>
            {JSON.stringify(state)}
          </code>
        </Col>
      </Row>
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
          <Button variant="dark" type="submit" size="lg" className="btn-pill">
            Registrarme
          </Button>
          <LinkContainer to={'/sign-in' + generateQueryParams({ r: true })}>
            <Button variant="outline-secondary" type="button" role="button" size="lg" className="btn-pill">
              Ya tengo cuenta
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col className="text-center my-4">
          <h5>O entra con</h5>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Button
            variant="primary"
            type="button"
            role="button"
            className={useStyleModules(SocialNetworksStyles.socialNetworkSignInButton, SocialNetworksStyles.btnLinkedIn)}
            size="lg">
            <FontAwesomeIcon icon={faLinkedin} /><span className={SocialNetworksStyles.socialNetworkName}>Linkedin</span>
          </Button>
          <Button
            variant="primary"
            type="button"
            role="button"
            className={useStyleModules(SocialNetworksStyles.socialNetworkSignInButton, SocialNetworksStyles.btnGoogle)}
            size="lg">
            <FontAwesomeIcon icon={faGoogle} /><span className={SocialNetworksStyles.socialNetworkName}>Google</span>
          </Button>
          <Button
            variant="dark"
            type="button"
            role="button"
            className={useStyleModules(SocialNetworksStyles.socialNetworkSignInButton, SocialNetworksStyles.btnMicrosoft)}
            size="lg">
            <FontAwesomeIcon icon={faMicrosoft} /><span className={SocialNetworksStyles.socialNetworkName}>Microsoft</span>
          </Button>
          <Button
            variant="light"
            type="button"
            role="button"
            className={useStyleModules(SocialNetworksStyles.socialNetworkSignInButton, SocialNetworksStyles.btnSlack)}
            size="lg">
            <FontAwesomeIcon icon={faSlack} /><span className={SocialNetworksStyles.socialNetworkName}>Slack</span>
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SignUpForm;
