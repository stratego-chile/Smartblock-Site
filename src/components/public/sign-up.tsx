import SignUpForm from 'components/forms/sign-up-form';
import { Title } from 'helpers/pager';
import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';

const SignUp: Smartblock.Types.IsolatedComponent = () => {

  useEffect(() => Title.set('Registro'), []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs="12" md="6" lg="4">
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
