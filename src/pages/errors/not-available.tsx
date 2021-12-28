import { Smartblock } from 'types';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from 'components/utils/layout';

const NotAvailable: Smartblock.Types.IsolatedComponent = (): JSX.Element => {
  return (
    <Layout pageTitle='Recurso no disponible'>
      <Container className="my-5">
        <Row>
          <Col className="text-center">
            <h1>Resource not available. Please, try again later</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NotAvailable;
