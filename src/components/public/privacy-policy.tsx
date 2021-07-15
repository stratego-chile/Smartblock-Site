import { useEffect } from 'react';
import { Title } from 'helpers/pager';
import { Container, Row, Col } from 'react-bootstrap';
import { Smartblock } from 'types';

const PrivacyPolicy: Smartblock.Types.IsolatedComponent= () => {

  useEffect(() => {
    Title.set('Política de privacidad');
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Política de privacidad</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
