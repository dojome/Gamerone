import request from 'utils/request';
import { Notification } from 'interfaces';

// GET users Notifications
export const getNotifications = () => {
  return request<Notification[]>('/notifications', { method: 'GET' });
};

/**
 * Read and remove the notification
 * @param param uid
 */
export const readNotificationWithId = (uid: string) => {
  return request<Notification[]>('/notifications/mark/' + uid, {
    method: 'GET',
  });
};

/**
 * Mark all notifications as read and return the new notifications
 */
export const markAllNotifications = () => {
  return request<Notification[]>('/notifications/mark', { method: 'GET' });
};
