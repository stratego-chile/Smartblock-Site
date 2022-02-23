import TopBarStyles from 'styles/modules/top-bar.module.sass';
import { useState, MouseEvent } from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Smartblock } from 'types';
import { FiSettings, FiBell } from 'react-icons/fi';
import NotificationsWrapper from 'components/shared/notifications-wrapper';
import { LinkContainer } from 'react-router-bootstrap';
import { PrivateRoutesMap } from 'routes/private.map';
import PrivateTopBarStyles from 'styles/modules/private-top-bar.module.sass';
import { useStyleModules } from 'helpers/props';

const PrivateTopBar: Smartblock.Types.IsolatedComponent = (): JSX.Element => {

  const [notifications, setNotifications] = useState<Smartblock.Types.Notification[]>([]);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  const toggleNotificationsPanel = (event: MouseEvent) => {
    if (event.isTrusted) {
      setShowPanel(!showPanel);
    }
  };

  return (
    <>
      <Navbar bg='light' className={useStyleModules(PrivateTopBarStyles.navbar, 'shadow')}>
        <Container fluid>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link
                className='fs-5'
                href='#'
                onClick={toggleNotificationsPanel}>
                <FiBell />
                {
                  notifications.filter(notification => !notification.dismissed).length > 0
                    ? <sup>
                      <small className={TopBarStyles.notificationBadge}>
                        <Badge pill bg='danger'>
                          &nbsp;
                        </Badge>
                      </small>
                    </sup>
                    : null
                }
              </Nav.Link>
              <NavDropdown
                className='fs-5'
                align='end'
                title={<FiSettings />}
                id='basic-nav-dropdown'>
                <NavDropdown.Item href='https://app.smartblock.cl/account'>Cuenta</NavDropdown.Item>
                <LinkContainer to={PrivateRoutesMap.preferences.path}>
                  <NavDropdown.Item>Preferencias</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to='/logout'>
                  <NavDropdown.Item>Cerrar Sesión</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <NotificationsWrapper
        showPanel={showPanel}
        onPanelClose={setShowPanel}
        onNotificationsLoad={setNotifications} />
    </>
  );
};

export default PrivateTopBar;
