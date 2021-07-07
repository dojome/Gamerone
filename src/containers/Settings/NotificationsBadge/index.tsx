import React, { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'components/common/Dropdown';
import Badge from 'components/common/Badge';
import Icon from 'components/common/Icon';
import ListItem from 'components/common/ListItem';

import MiscActions from 'redux/misc/actions';
import { selectNotifications } from 'redux/misc/selectors';
import IsAuthenticated from 'components/utility/IsAuthenticated';

export interface NotificationsBadgeProps {
  mobile?: boolean;
}

const NotificationsBadge: React.FC<NotificationsBadgeProps> = ({
  mobile = false,
}: NotificationsBadgeProps): JSX.Element => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  // const notificationsStatus = useSelector(selectNotificationsStatus);

  const handleMarkAsRead = useCallback(
    (notificationUuid: string) => {
      dispatch(MiscActions.readNotification(notificationUuid));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    dispatch(MiscActions.getNotifications());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notificationItems: any[] = useMemo(
    () =>
      notifications.length > 0
        ? notifications.map(({ id, title, imageSrc }) => (
            <ListItem
              key={id}
              title={title}
              image={imageSrc}
              onClick={() => handleMarkAsRead(id)}
            />
          ))
        : [<ListItem key="no" title="No Notifications" />],
    [notifications, handleMarkAsRead],
  );

  return (
    <IsAuthenticated>
      {!mobile ? (
        <Dropdown type="wide" title="Notifications" content={notificationItems}>
          <Badge type="flat-dark" size="medium" testid="notification">
            <Icon name={'icon-alarm-bell'} size="125x" />
          </Badge>
        </Dropdown>
      ) : (
        <Dropdown type="wide" title="Notifications" content={notificationItems}>
          <Badge
            type="flat-dark"
            style={{ background: 'none' }}
            testid="notification-mobile"
          >
            <Icon name={'icon-alarm-bell'} size="125x" />
          </Badge>
          <label>Notifications</label>
        </Dropdown>
      )}
    </IsAuthenticated>
  );
};

export default NotificationsBadge;
