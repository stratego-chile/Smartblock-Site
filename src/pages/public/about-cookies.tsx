import { Smartblock } from 'types';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from 'components/utils/layout';

const AboutCookies: Smartblock.Types.IsolatedComponent = (): JSX.Element => {
  return (
    <Layout pageTitle='Cookies'>
      <Container className="my-5">
        <Row>
          <Col>
            <h1>Sobre el uso y configuraciones de las cookies</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default AboutCookies;
