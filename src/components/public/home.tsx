import HomeStyles from 'styles/modules/home.module.sass';
import ContactForm from 'components/forms/contact-form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Smartblock } from 'types';
import Layout from 'helpers/layout';

const Home: Smartblock.Types.IsolatedComponent = () => {
  return (
    <Layout pageTitle='Inicio'>
      <Container className={HomeStyles.banner} fluid>
        <Container className={HomeStyles.bannerWrapper}>
          <Row className={HomeStyles.bannerWrapper}>
            <Col>
              <h1 className={HomeStyles.bannerTitle}>Decisiones eficaces, seguimiento incorruptible</h1>
              <h3 className='fw-light'>
                Estandarice sus flujos de trabajo con proveedores y contrastistas
              </h3>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className={HomeStyles.wrapper}>
        <Row>
          <Col>
            <h1 className={HomeStyles.sectionTitle}>
              Smartblock&reg; Buy Orders y Smart Contracts
            </h1>
            <h3 className='fw-light'>
              Gestiona y traza tus órdenes de compras y contratos de servicio según el estándar <a href='https://www.neccontract.com/' target='_blank' rel='noopener noreferrer'>
                <b>NEC 4&reg;</b>
              </a>.
            </h3>
          </Col>
        </Row>
      </Container>
      <Container className={HomeStyles.wrapper}>
        <Row>
          <Col>
            <h1 className={HomeStyles.sectionTitle}>
              Garantizamos la trazabilidad y auditoría de sus proyectos gracias al respaldo de la tecnología blockchain.
            </h1>
          </Col>
        </Row>
      </Container>
      <Container className={HomeStyles.bannerTryWrapper} fluid>
        <Container className={HomeStyles.wrapper}>
          <Row>
            <Col>
              <h1 className={HomeStyles.sectionTitle}>Prueba la app. Rápido y no necesitas registrarte</h1>
              <h5>
                <Button variant='light' size='lg' className='btn-pill mt-4' href='//app.smartblock.cl/preview?mode=try-out&ref=home-try'>
                  Iniciar sesión de prueba
                </Button>
              </h5>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className={HomeStyles.wrapper}>
        <Row>
          <Col>
            <h1 className={HomeStyles.sectionTitle}>¿Tienes dudas o necesitas una solución personalizada?</h1>
            <h5>Contáctanos. Te podemos ayudar.</h5>
          </Col>
        </Row>
        <Row>
          <Col className='mt-4'>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Home;
