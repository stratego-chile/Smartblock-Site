import { useEffect } from 'react';
import { Title } from 'helpers/pager';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';

const NoSession: Smartblock.Types.IsolatedComponent = () => {

  useEffect(() => {
    Title.set('Recurso innaccesible');
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <h1>No tienes acceso a este recurso</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NoSession;
