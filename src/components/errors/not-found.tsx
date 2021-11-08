import NotFoundStyles from 'styles/modules/error-page.module.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';
import Layout from 'helpers/layout';

const NotFound: Smartblock.Types.IsolatedComponent = () => {
  return (
    <Layout pageTitle='Recurso no encontrado'>
      <Container className={NotFoundStyles.wrapper}>
        <Row className="h-100 align-content-center">
          <Col>
            <h1 className="text-center">Recurso no encontrado</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NotFound;
