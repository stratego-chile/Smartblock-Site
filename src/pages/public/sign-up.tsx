import SignUpForm from 'components/forms/sign-up-form';
import Layout from 'components/utils/layout';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';

const SignUp: Smartblock.Types.IsolatedComponent = (): JSX.Element => {
  return (
    <Layout pageTitle='Registro'>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6" lg="4">
            <SignUpForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default SignUp;
