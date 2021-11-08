import { Title } from 'helpers/pager';
import { FC, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Smartblock } from 'types';

const Preferences: FC<Smartblock.Types.IsolatedComponent> = () => {

  useEffect(() => {
    Title.set('Preferencias');
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Preferencias</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Preferences;
