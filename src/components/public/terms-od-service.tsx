import { useEffect } from 'react';
import { Title } from 'helpers/pager';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';

const TermsOfService: Smartblock.Types.IsolatedComponent= () => {

  useEffect(() => {
    Title.set('Términos y condiciones de servicio');
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Términos y condiciones de servicio</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfService;
