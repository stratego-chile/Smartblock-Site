import SignInForm from 'components/forms/sign-in-form';
import { Title } from 'helpers/pager';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';

const SignIn: Smartblock.Types.IsolatedComponent = () => {

  useEffect(() => Title.set('Iniciar sesión'), []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs="12" md="6" lg="4">
          <SignInForm />
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
