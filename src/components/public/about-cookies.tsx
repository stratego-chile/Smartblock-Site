import { Smartblock } from 'types';
import { Container, Row, Col } from 'react-bootstrap';
import { Title } from 'helpers/pager';
import { useEffect } from 'react';

const AboutCookies: Smartblock.Types.IsolatedComponent = () => {

  useEffect(() => {
    Title.set('Cookies');
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1>Sobre el uso y configuraciones de las cookies</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutCookies;
