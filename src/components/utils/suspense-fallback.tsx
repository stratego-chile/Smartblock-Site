import { Container, Row, Col } from 'react-bootstrap';
import { BallTriangle } from 'react-loader-spinner';
import SplashScreenStyles from 'styles/modules/splash-screen.module.sass';

const SuspenseFallback = (descriptorText?: string): JSX.Element => {
  return (
    <Container className={descriptorText ? SplashScreenStyles.innerWrapper : SplashScreenStyles.wrapper}>
      <Row className='h-100 align-content-center'>
        <Col>
          <BallTriangle
            wrapperClass='w-100 justify-content-center'
            ariaLabel='loading'
            height='100'
            width='100'
            color='#5A5A5A' />
          {descriptorText ? <h5 className='mt-5'>{descriptorText}</h5> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default SuspenseFallback;
