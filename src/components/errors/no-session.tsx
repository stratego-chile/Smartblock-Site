import NoSessionStyles from 'styles/modules/error-page.module.sass';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { injectQueryParams } from 'helpers/route';
import { RoutesMap } from 'routes/map';
import { Hasher } from 'helpers/hasher';
import { Smartblock } from 'types';
import Layout from 'helpers/layout';

const NoSession: Smartblock.Types.IsolatedComponent = () => {

  const [resource, setResource] = useState<string>('');
  const [returnUrl, setReturnUrl] = useState<string>('');

  const checkRequestedResource = () => {
    setResource(window.location.pathname);
    setReturnUrl(Hasher.encode.Base64(window.location.pathname));
  };

  useEffect(() => {
    checkRequestedResource();
  }, []);

  return (
    <Layout pageTitle='Recurso innaccesible'>
      <Container className={NoSessionStyles.wrapper}>
        <Row className="h-100 align-content-center">
          <Col className="text-center">
            <h1>El recurso solicitado no se encuentra disponible o no cuentas con los permisos necesarios</h1>
            <br />
            <h5>
              <LinkContainer to={RoutesMap.signIn.path + injectQueryParams({ returnUrl })}>
                <a>Inicia sesión</a>
              </LinkContainer>
              &nbsp;o&nbsp;
              <LinkContainer to={RoutesMap.signUp.path + injectQueryParams({ returnUrl })}>
                <a>crea una cuenta</a>
              </LinkContainer>
              &nbsp;para acceder a <b>{resource.replace('/', '')}</b>
            </h5>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NoSession;
