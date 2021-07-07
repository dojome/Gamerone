import { UploadRequest, Notification } from 'interfaces';
import { NotificationModel } from 'models/NotificationModel';

/**
 * General
 */
export const UPLOAD_FILE_REQUEST = 'misc/UPLOAD_FILE_REQUEST';

export const DELETE_FILE_REQUEST = 'misc/DELETE_FILE_REQUEST';

export const DELETE_FILE_SUCCESS = 'misc/DELETE_FILE_SUCCESS';

/**
 * Notifications
 */
export const GET_NOTIFICATIONS_REQUEST = 'misc/GET_NOTIFICATIONS_REQUEST';

export const READ_NOTIFICATION_REQUEST = 'misc/READ_NOTIFICATION_REQUEST';

export const UPDATE_NOTIFICATIONS = 'misc/UPDATE_NOTIFICATIONS';

export const READ_ALL_NOTIFICATIONS_REQUEST =
  'misc/READ_ALL_NOTIFICATIONS_REQUEST';

/**
 * File Upload/Delete
 */
export interface UploadFileAction {
  type: typeof UPLOAD_FILE_REQUEST;
  payload: UploadRequest;
}

export interface DelteUploadedFileAction {
  type: typeof DELETE_FILE_REQUEST;
  payload: string;
}

export interface DeleteFileSuccessAction {
  type: typeof DELETE_FILE_SUCCESS;
  payload: string;
}

/**
 * Notifications
 */
export interface GetNotificationsAction {
  type: typeof GET_NOTIFICATIONS_REQUEST;
}

export interface UpdateNotificationsAction {
  type: typeof UPDATE_NOTIFICATIONS;
  payload: Notification[];
}

export interface ReadNotificationAction {
  type: typeof READ_NOTIFICATION_REQUEST;
  payload: string;
}

export interface ReadAllNotificationsAction {
  type: typeof READ_ALL_NOTIFICATIONS_REQUEST;
}

/**
 * State
 */
export type MiscState = {
  notifications: NotificationModel[];
};

/**
 * Action types
 */
export type MiscActionTypes =
  | DelteUploadedFileAction
  | DeleteFileSuccessAction
  | UploadFileAction
  | GetNotificationsAction
  | ReadNotificationAction
  | ReadAllNotificationsAction
  | UpdateNotificationsAction;
