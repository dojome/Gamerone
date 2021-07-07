import {
  UPLOAD_FILE_REQUEST,
  DELETE_FILE_REQUEST,
  GET_NOTIFICATIONS_REQUEST,
  GetNotificationsAction,
  READ_NOTIFICATION_REQUEST,
  READ_ALL_NOTIFICATIONS_REQUEST,
  UploadFileAction,
  DelteUploadedFileAction,
} from './types';
import { UploadRequest } from 'interfaces';

export default {
  // file
  uploadFile: (payload: UploadRequest): UploadFileAction => ({
    type: UPLOAD_FILE_REQUEST,
    payload,
  }),

  deleteFile: (file: string): DelteUploadedFileAction => ({
    type: DELETE_FILE_REQUEST,
    payload: file,
  }),

  // notification
  getNotifications: (): GetNotificationsAction => ({
    type: GET_NOTIFICATIONS_REQUEST,
  }),

  readNotification: (uid: string) => ({
    type: READ_NOTIFICATION_REQUEST,
    payload: uid,
  }),

  readAllNotifications: () => ({
    type: READ_ALL_NOTIFICATIONS_REQUEST,
  }),
};
