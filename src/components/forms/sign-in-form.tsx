import { FC, FormEvent, useState } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faMicrosoft, faGoogle, faSlack } from '@fortawesome/free-brands-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import { generateQueryParams, useStyleModules } from 'helpers/props';
import SocialNetworksStyles from 'styles/modules/social-networks.module.sass';

type SignInFormState = {
  isSubmitting?: boolean
}

const SignInForm: FC<Record<string, never>> = () => {

  const [state, setState] = useState<SignInFormState>();

  const handleSubmit = async (event: FormEvent) =>  {
    if (event.isTrusted) {
      event.preventDefault();
      setState({
        ...state
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="text-center my-5">
          <h2>Hola, nos encontramos otra vez</h2>
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
          <FloatingLabel controlId="password" label="Contraseña" className="mb-3">
            <Form.Control type="password" placeholder="Contraseña" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="my-4">
        <Col className="d-grid gap-3">
          <Button variant="dark" type="submit" size="lg" className="btn-pill">
            Entrar
          </Button>
          <LinkContainer to={'/sign-up' + generateQueryParams({ r: false })}>
            <Button variant="outline-secondary" type="button" role="button" size="lg" className="btn-pill">
              No tengo cuenta
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

export default SignInForm;
