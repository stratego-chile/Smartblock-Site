import { FC, FormEvent, useState } from 'react';
import { Form, Row, Col, FloatingLabel, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SocialNetworks from 'components/utils/social-networks';
import { Smartblock } from 'types';
import { injectQueryParams } from 'helpers/route';
import SubmitButton from 'components/utils/submit-button';

const SignInForm: FC<Record<string, never>> = () => {

  const [state, setState] = useState<Smartblock.Types.SignInFormState>();

  const handleSubmit = async (event: FormEvent) =>  {
    if (event.isTrusted) {
      event.preventDefault();
      setState({
        ...state,
        isSubmitting: true
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
          <SubmitButton
            variant="dark"
            size="lg"
            className="btn-pill"
            submitting={!!state?.isSubmitting}
            defaultContent="Entrar" />
          <LinkContainer to={'/sign-up' + injectQueryParams({ r: false })}>
            <Button variant="outline-secondary" type="button" role="button" size="lg" className="btn-pill">
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
