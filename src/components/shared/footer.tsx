import FooterStyles from 'styles/modules/footer.module.sass';
import { Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Smartblock } from 'types';
import { useEffect, useState } from 'react';

const Footer: Smartblock.Types.IsolatedComponent = (): JSX.Element => {

  const [currentYear, setCurrentYear] = useState<number>();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <Container fluid className={FooterStyles.footer}>
      <Row className={FooterStyles.footerContentWrapper}>
        <Container>
          <Row className={FooterStyles.linkWrapper}>
            <Col sm='12' lg='auto' className={FooterStyles.footerLink}>
              <LinkContainer to='/tos'>
                <a>Términos y condiciones</a>
              </LinkContainer>
            </Col>
            <Col sm='12' lg='auto' className={FooterStyles.footerLink}>
              <LinkContainer to='/pp'>
                <a>Política de privacidad</a>
              </LinkContainer>
            </Col>
            <Col sm='12' lg='auto' className={FooterStyles.footerLink}>
              <LinkContainer to='/ac'>
                <a>Sobre las Cookies</a>
              </LinkContainer>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className={FooterStyles.footerContentWrapper}>
        <Col>
          <p>
            {currentYear}&nbsp;&copy;&nbsp;<b>Smartblock Technologies SpA</b>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
