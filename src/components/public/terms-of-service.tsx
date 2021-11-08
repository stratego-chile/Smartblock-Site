import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';
import Layout from 'helpers/layout';

const TermsOfService: Smartblock.Types.IsolatedComponent = () => {
  return (
    <Layout pageTitle='Términos y condiciones de servicio'>
      <Container className="my-5">
        <Row>
          <Col>
            <h1>Términos y condiciones de servicio</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default TermsOfService;
