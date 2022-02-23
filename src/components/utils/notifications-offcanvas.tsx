import { FC, MouseEvent, useEffect, useState } from 'react';
import { Button, Offcanvas, Toast, ToastContainer } from 'react-bootstrap';
import { Smartblock } from 'types';

const NotificationsOffcanvas: FC<Smartblock.Types.NotificationsProps> = (props): JSX.Element => {

  const [show, setShow] = useState<boolean>(props.showPanel);
  const [notifications, setNotifications] = useState<Smartblock.Types.Notification[]>([]);

  const handleClose = () => {
    setShow(false);
    props.onClose();
  };

  const handleShow = () => {
    setShow(true);
  };

  const dismissAllNotifications = (event: MouseEvent) => {
    if (event.isTrusted) {
      props.onNotificationsDismiss(event);
      handleClose();
    }
  };

  const handleNotificationClose = (key: number) => {
    props.onNotificationDismiss(key);
  };

  useEffect(() => {
    if (props.showPanel) {
      handleShow();
    }
    if (props.notifications) {
      setNotifications(props.notifications);
    }
  }, [props]);

  return (
    <Offcanvas show={show} placement='end' onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Notificaciones</Offcanvas.Title>
      </Offcanvas.Header>
      {
        notifications.filter(notification => !notification.dismissed).length > 0
          ? <p className='text-end'>
            <Button variant='link' size='sm' onClick={dismissAllNotifications}>
              <small>Ignorar todas</small>
            </Button>
          </p>
          : null
      }
      <Offcanvas.Body as={ToastContainer} className='fixed-wrapper'>
        {
          notifications.filter(notification => !notification.dismissed).length === 0
            ? <Toast className='shadow-none border-0'>
              <Toast.Header closeButton={false}></Toast.Header>
              <Toast.Body>
                <p className='text-muted text-center'>No hay notificaciones pendientes</p>
              </Toast.Body>
            </Toast>
            : notifications
              .filter(notification => !notification.dismissed)
              .map((notification, key) => <Toast
                key={key}
                animation={false}
                onClose={() => handleNotificationClose(key)} >
                <Toast.Header>
                  <strong className='me-auto'>
                    {notification.title}
                  </strong>
                  <small className='text-muted'>
                    Recibido a las&nbsp;{new Date(notification.timestamp).toLocaleTimeString()}
                  </small>
                </Toast.Header>
                <Toast.Body>
                  {notification.text}
                </Toast.Body>
              </Toast>
              )
        }
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default NotificationsOffcanvas;
