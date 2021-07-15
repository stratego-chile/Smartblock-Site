import HomeStyles from 'styles/modules/home.module.sass';
import ContactForm from 'components/forms/contact-form';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Title } from 'helpers/pager';
import { Smartblock } from 'types';
import { useEffect } from 'react';

const Home: Smartblock.Types.IsolatedComponent = () => {

  useEffect(() => {
    Title.set('Inicio');
  }, []);

  return (
    <>
      <Container className={HomeStyles.banner} fluid>
        <Container className={HomeStyles.bannerWrapper}>
          <Row className={HomeStyles.bannerWrapper}>
            <Col>
              <h1 className={HomeStyles.bannerTitle}>Potencia y asegura tu negocio</h1>
              <h3>Usando los últimos avances en tecnología <b>Blockchain</b> y contratos inteligentes</h3>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className={HomeStyles.wrapper}>
        <Row>
          <Col>
            <h1 className={HomeStyles.sectionTitle}>Tenemos un compromiso con garantizar la trazabilidad de tus proyectos y flujos de trabajo</h1>
          </Col>
        </Row>
      </Container>
      <Container className={HomeStyles.bannerTryWrapper} fluid>
        <Container className={HomeStyles.wrapper}>
          <Row>
            <Col>
              <h1 className={HomeStyles.sectionTitle}>Prueba la app. Fácil, rápido y no necesitas registrarte</h1>
              <h5>
                <LinkContainer to="/preview?mode=try-out&ref=home-try">
                  {/* <a>Inicia una sesión de prueba</a> */}
                  <Button variant="light" size="lg" className="btn-pill mt-4">
                    Iniciar sesión de prueba
                  </Button>
                </LinkContainer>
              </h5>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className={HomeStyles.wrapper}>
        <Row>
          <Col>
            <h1 className={HomeStyles.sectionTitle}>¿Tienes dudas? ¿necesitas una solución personalizada?</h1>
            <h5>Contáctanos. Te podemos ayudar.</h5>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4">
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
