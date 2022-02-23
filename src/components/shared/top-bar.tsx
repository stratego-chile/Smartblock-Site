import TopBarStyles from 'styles/modules/top-bar.module.sass';
import SmartblockLogo from 'assets/logos/smartblock-logo.svg';
import SmartblockIcon from 'assets/logos/smartblock-icon.svg';
import { useRef, useState, MouseEvent } from 'react';
import { Navbar, Nav, Container, Image, Form, Button, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Smartblock } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import NotificationsWrapper from 'components/shared/notifications-wrapper';
import { useStyleModules } from 'helpers/props';

const TopBar: Smartblock.Types.IsolatedComponent = (): JSX.Element => {

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<Smartblock.Types.Notification[]>([]);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  const togglerRef = useRef<HTMLButtonElement>(document.createElement('button'));
  
  const handleCollapseButtonClick = (event: MouseEvent) => {
    if (event) {
      setCollapsed(!collapsed);
    }
  };

  const handleNavBarLinkClick = (event: MouseEvent) => {
    if (event.isTrusted && togglerRef && !collapsed) {
      togglerRef.current.click();
    }
  };

  const toggleNotificationsPanel = (event: MouseEvent) => {
    if (event.isTrusted) {
      setShowPanel(!showPanel);
    }
  };

  return (
    <>
      <Navbar bg='light' expand='lg' className={TopBarStyles.navBar}>
        <Container>
          <span className={TopBarStyles.topBarSpacerHelper} />
          <LinkContainer to='/home'>
            <Navbar.Brand>
              <Image className={useStyleModules(TopBarStyles.topBarLogo, 'd-none', 'd-lg-inline-block')} src={SmartblockLogo} alt='Smartblock Tech SpA' />
              <Image className={useStyleModules(TopBarStyles.topBarLogo, 'd-inline-block', 'd-lg-none')} src={SmartblockIcon} alt='Smartblock Tech SpA' />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            ref={togglerRef}
            aria-controls='topBarMainMenu'
            className={TopBarStyles.navBarToggler}
            aria-expanded={!collapsed}
            onClick={handleCollapseButtonClick}>
            <span className={!collapsed ? TopBarStyles.topBar : TopBarStyles.topBarExpanded} />
            <span className={!collapsed ? TopBarStyles.middleBar : TopBarStyles.middleBarExpanded} />
            <span className={!collapsed ? TopBarStyles.bottomBar : TopBarStyles.bottomBarExpanded} />
          </Navbar.Toggle>
          <Navbar.Collapse id='topBarMainMenu' className={TopBarStyles.topBarMainMenu}>
            <Nav className='me-auto'>
              <LinkContainer to='/home'>
                <Nav.Link onClick={handleNavBarLinkClick}>Inicio</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className='ms-auto'>
              <LinkContainer to='/sign-up'>
                <Nav.Link onClick={handleNavBarLinkClick}>Registrarme</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/sign-in'>
                <Nav.Link onClick={handleNavBarLinkClick}>Iniciar Sesión</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          <Form className={TopBarStyles.notificationIndicator}>
            <Button
              variant='light'
              className='btn-pill no-shadow'
              onClick={toggleNotificationsPanel}
              role='button'
              type='button'
              size='lg'>
              <FontAwesomeIcon icon={farBell} />
              {
                notifications.filter(notification => !notification.dismissed).length > 0
                  ? <sup>
                    <small className={TopBarStyles.notificationBadge}>
                      <Badge pill bg='danger'>
                        {
                          notifications.filter(not => !not.dismissed).length > 9
                            ? '9+'
                            : notifications.filter(not => !not.dismissed).length
                        }
                      </Badge>
                    </small>
                  </sup>
                  : null
              }
            </Button>
          </Form>
        </Container>
      </Navbar>
      <NotificationsWrapper
        showPanel={showPanel}
        onPanelClose={setShowPanel}
        onNotificationsLoad={setNotifications} />
    </>
  );
};

export default TopBar;
