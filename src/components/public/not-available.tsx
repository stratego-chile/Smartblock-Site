import { Smartblock } from 'types';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { Title } from 'helpers/pager';

const NotAvailable: Smartblock.Types.IsolatedComponent = () => {

  useEffect(() => {
    Title.set('Recurso no disponible');
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <h1>Resource not available. Please, try again later</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NotAvailable;
