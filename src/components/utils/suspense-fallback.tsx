import { Container, Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import SplashScreenStyles from 'styles/modules/splash-screen.module.sass';

const SuspenseFallback = (): JSX.Element => {
  return (
    <Container className={SplashScreenStyles.wrapper}>
      <Row className="h-100 align-content-center">
        <Col className="text-center">
          <Loader
            type="BallTriangle"
            color="#5a5a5a" />
        </Col>
      </Row>
    </Container>
  );
};

export default SuspenseFallback;
