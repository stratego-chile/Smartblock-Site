import { useStyleModules } from 'helpers/props';
import { Container, Row, Col } from 'react-bootstrap';
import { BallTriangle } from 'react-loader-spinner';
import SplashScreenStyles from 'styles/modules/splash-screen.module.sass';

export type SuspenseFallbackOptions = {
  useRelativeHeight?: boolean;
};

const SuspenseFallback = (descriptorText?: string, options?: SuspenseFallbackOptions): JSX.Element => {
  return (
    <Container className={descriptorText ? SplashScreenStyles.innerWrapper : SplashScreenStyles.wrapper}>
      <Row className={useStyleModules('align-content-center', options?.useRelativeHeight ? 'h-auto' : 'h-100')}>
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
