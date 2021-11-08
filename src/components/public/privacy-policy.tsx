import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';
import Layout from 'helpers/layout';

const PrivacyPolicy: Smartblock.Types.IsolatedComponent = () => {
  return (
    <Layout pageTitle='Política de privacidad'>
      <Container className="my-5">
        <Row>
          <Col>
            <h1>Política de privacidad</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;
