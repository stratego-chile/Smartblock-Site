import SmartblockLogo from 'assets/logos/smartblock-logo.svg';
import SmartblockIcon from 'assets/logos/smartblock-icon.svg';
import TopBarStyles from 'styles/modules/top-bar.module.sass';
import { useState } from 'react';
import { Navbar, Nav, Container, Image, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Smartblock } from 'types';

const TopBar: Smartblock.Types.IsolatedComponent = () => {

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [showDevModeAlert, setShowDevModeAlert] = useState<boolean>(true);
  
  const handleCollapseClick = (event: React.MouseEvent) => {
    if (event.isTrusted) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <>
      {
        showDevModeAlert && process.env.NODE_ENV === 'development'
          ? <Alert className="sticky-top mb-0" variant="warning" onClose={() => setShowDevModeAlert(false)} dismissible>
            Esta aplicación está en desarrollo y está sujeto a cambios. Por favor, tenga en consideración que puede ser inestable y presentar comportamientos inesperados.
          </Alert>
          : null
      }
      <Navbar bg="light" expand="lg" className={TopBarStyles.navBar}>
        <Container>
          <span className={TopBarStyles.topBarSpacerHelper} />
          <LinkContainer to="/home">
            <Navbar.Brand className="d-none d-lg-inline-block">
              <Image className={TopBarStyles.topBarLogo} src={SmartblockLogo} alt="Smartblock Tech SpA" />
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/home">
            <Navbar.Brand className="d-inline-block d-lg-none">
              <Image className={TopBarStyles.topBarLogo} src={SmartblockIcon} alt="Smartblock Tech SpA" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            aria-controls="topBarMainMenu"
            className={TopBarStyles.navBarToggler}
            aria-expanded={!collapsed}
            onClick={handleCollapseClick}>
            <span className={!collapsed ? TopBarStyles.topBar : TopBarStyles.topBarExpanded} />
            <span className={!collapsed ? TopBarStyles.middleBar : TopBarStyles.middleBarExpanded} />
            <span className={!collapsed ? TopBarStyles.bottomBar : TopBarStyles.bottomBarExpanded} />
          </Navbar.Toggle>
          <Navbar.Collapse id="topBarMainMenu" className={TopBarStyles.topBarMainMenu}>
            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link>Inicio</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ms-auto">
              <LinkContainer to="/sign-up">
                <Nav.Link>Registrarme</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/sign-in">
                <Nav.Link>Iniciar Sesión</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
