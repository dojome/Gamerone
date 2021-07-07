import {
  call,
  all,
  takeEvery,
  put,
  fork,
  takeLatest,
} from 'redux-saga/effects';

import * as MiscApi from 'api/misc';
import * as NotificationApi from 'api/notifications';

import {
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DelteUploadedFileAction,
  GET_NOTIFICATIONS_REQUEST,
  UPDATE_NOTIFICATIONS,
  READ_NOTIFICATION_REQUEST,
  ReadNotificationAction,
  READ_ALL_NOTIFICATIONS_REQUEST,
} from './types';
import RequestStatusActions from 'redux/request-status/actions';

/**
 * Delete file
 */
export function* deleteFileRequest() {
  yield takeEvery(DELETE_FILE_REQUEST, function* ({
    payload,
  }: DelteUploadedFileAction) {
    yield put(RequestStatusActions.startRequest(DELETE_FILE_REQUEST));
    try {
      yield call(MiscApi.deleteFile, payload);

      yield put({
        type: DELETE_FILE_SUCCESS,
        payload,
      });

      yield put(RequestStatusActions.finishRequest(DELETE_FILE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_FILE_REQUEST, err));
    }
  });
}

/**
 * Notifications
 */
export function* getNotificationsRequest() {
  yield takeLatest(GET_NOTIFICATIONS_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_NOTIFICATIONS_REQUEST));

    try {
      const notifications = yield call(NotificationApi.getNotifications);
      yield put({
        type: UPDATE_NOTIFICATIONS,
        payload: notifications,
      });
      yield put(RequestStatusActions.finishRequest(GET_NOTIFICATIONS_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_NOTIFICATIONS_REQUEST, err),
      );
    }
  });
}

export function* readNotificationRequest() {
  yield takeLatest(READ_NOTIFICATION_REQUEST, function* ({
    payload,
  }: ReadNotificationAction) {
    yield put(RequestStatusActions.startRequest(READ_NOTIFICATION_REQUEST));

    try {
      const notifications = yield call(
        NotificationApi.readNotificationWithId,
        payload,
      );
      yield put({
        type: UPDATE_NOTIFICATIONS,
        payload: notifications,
      });
      yield put(RequestStatusActions.finishRequest(READ_NOTIFICATION_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(READ_NOTIFICATION_REQUEST, err),
      );
    }
  });
}

export function* readAllNotificationsRequest() {
  yield takeLatest(READ_ALL_NOTIFICATIONS_REQUEST, function* () {
    yield put(
      RequestStatusActions.startRequest(READ_ALL_NOTIFICATIONS_REQUEST),
    );

    try {
      const notifications = yield call(NotificationApi.markAllNotifications);
      yield put({
        type: UPDATE_NOTIFICATIONS,
        payload: notifications,
      });
      yield put(
        RequestStatusActions.finishRequest(READ_ALL_NOTIFICATIONS_REQUEST),
      );
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(READ_ALL_NOTIFICATIONS_REQUEST, err),
      );
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(deleteFileRequest),

    fork(getNotificationsRequest),
    fork(readNotificationRequest),
    fork(readAllNotificationsRequest),
  ]);
}
