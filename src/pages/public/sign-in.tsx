import SignInForm from 'components/forms/sign-in-form';
import Layout from 'components/utils/layout';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';

const SignIn: Smartblock.Types.IsolatedComponent = (): JSX.Element => {
  return (
    <Layout pageTitle='Iniciar sesión'>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6" lg="4">
            <SignInForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignIn;
