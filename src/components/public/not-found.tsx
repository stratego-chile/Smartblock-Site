import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Title } from 'helpers/pager';
import { Smartblock } from 'types';

const NotFound: Smartblock.Types.IsolatedComponent = () => {

  useEffect(() => {
    Title.set('Error 404');
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center">Resource not found</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
