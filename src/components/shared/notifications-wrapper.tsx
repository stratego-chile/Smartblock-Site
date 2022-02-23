import NotificationsStyles from 'styles/modules/top-bar.module.sass';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationsOffcanvas from 'components/utils/notifications-offcanvas';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import { Hasher } from 'helpers/hasher';
import { useStyleModules } from 'helpers/props';
import { useState, useLayoutEffect, MouseEvent, FC, useEffect } from 'react';
import { Smartblock } from 'types';

const NotificationsWrapper: FC<Smartblock.Types.NotificationsWrapperProps> = ({ showPanel, ...props }): JSX.Element => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Smartblock.Types.Notification[]>([]);
  const [notificationsToggled, setNotificationsToggled] = useState<boolean>(false);

  const showNotificationsInLateralPanel = (event: MouseEvent) => {
    if (event.isTrusted) {
      setShowNotifications(true);
      setNotificationsToggled(true);
    }
  };

  const dismissAllNotifications = (event: MouseEvent | Smartblock.Types.Notification[]) => {
    const dismissAll = (list?: Smartblock.Types.Notification[]) => {
      if (!list) {
        list = notifications;
      }
      list.forEach((_notification, index) => {
        handleSingleNotificationDismiss(index, false);
      });
      setNotifications(list);
    };
    if (event instanceof Array) {
      dismissAll();
    } else {
      if (event.isTrusted) {
        dismissAll();
      }
    }
    props.onNotificationsLoad(notifications);
  };

  const handleSingleNotificationDismiss = (localNotificationIndex: number, triggerRender = true) => {
    const currentList = notifications;
    const currentNotification = currentList[localNotificationIndex];
    if (currentNotification.isLocal) {
      localStorage.setItem(currentNotification.storageAccessKey, String(false));
    }
    currentList[localNotificationIndex].dismissed = true;
    if (triggerRender) {
      setNotifications(currentList.filter(not => !not.dismissed));
      props.onNotificationsLoad(notifications);
    }
  };

  useLayoutEffect(() => {
    const localNotifications: Smartblock.Types.Notification[] = [ // Testing data
      {
        text: 'Bienvenid@ a Smartblock',
        timestamp: Date.now(),
        isLocal: true,
        storageAccessKey: Hasher.hash.asSHA512('welcome-notification'),
      },
    ];
    setNotifications(
      localNotifications.filter(
        notification => !notification.isLocal ||
          (notification.isLocal &&
            (!localStorage.getItem(notification.storageAccessKey) ??
              localStorage.getItem(notification.storageAccessKey) === String(true))
          )
      )
    );
  }, []);

  useEffect(() => {
    if (props.onPanelClose) {
      props.onPanelClose(showNotifications);
    }
    if (showNotifications) {
      setNotificationsToggled(true);
    }
  }, [showNotifications]);

  useEffect(() => {
    setShowNotifications(!!showPanel);
  }, [showPanel]);

  useEffect(() => {
    props.onNotificationsLoad(notifications);
  }, [notifications]);

  return (
    <>
      {
        !notificationsToggled
          ? <ToastContainer className={NotificationsStyles.notificationToastContainer}>
            {
              notifications.map((notification, key) => key < 5
                ? <Toast
                  key={key}
                  animation={true}
                  onClose={() => { handleSingleNotificationDismiss(key); }} >
                  <Toast.Header className={NotificationsStyles.notificationToastHead}>
                    <strong className='me-auto'>
                      <FontAwesomeIcon icon={faInfoCircle} />&nbsp;{notification.title}
                    </strong>
                    <small className='text-muted'>
                      Recibido a las&nbsp;{new Date(notification.timestamp).toLocaleTimeString()}
                    </small>
                  </Toast.Header>
                  <Toast.Body className={NotificationsStyles.notificationToastBody}>{notification.text}</Toast.Body>
                </Toast>
                : null
              )
            }
            {
              notifications.filter(notification => !notification.dismissed).length > 5
                ? <Toast>
                  <Toast.Header
                    closeButton={false}
                    className={useStyleModules(NotificationsStyles.notificationToastHead, 'justify-content-between')} >
                    <Button variant='link' size='sm' onClick={showNotificationsInLateralPanel}>
                      Ver todas
                    </Button>
                    <Button variant='link' size='sm' onClick={dismissAllNotifications}>
                      Descartar todas
                    </Button>
                  </Toast.Header>
                </Toast>
                : null
            }
          </ToastContainer>
          : null
      }
      <NotificationsOffcanvas
        notifications={notifications}
        showPanel={showNotifications}
        onClose={() => setShowNotifications(false)}
        onNotificationsDismiss={dismissAllNotifications}
        onNotificationDismiss={handleSingleNotificationDismiss} />
    </>
  );
};

export default NotificationsWrapper;
