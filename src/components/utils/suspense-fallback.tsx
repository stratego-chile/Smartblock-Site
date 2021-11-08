import { Container, Row, Col } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import SplashScreenStyles from 'styles/modules/splash-screen.module.sass';

const SuspenseFallback = (descriptorText?: string): JSX.Element => {
  return (
    <Container className={descriptorText ? SplashScreenStyles.innerWrapper : SplashScreenStyles.wrapper}>
      <Row className="h-100 align-content-center">
        <Col className="text-center">
          <Loader
            type="BallTriangle"
            color="#5a5a5a" />
          {descriptorText ? <h5 className="mt-5">{descriptorText}</h5> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default SuspenseFallback;
