import { call, all, takeEvery, put, fork, select } from 'redux-saga/effects';

// import { POST_IMAGE_LIMIT } from 'utils/constants';
import * as MiscApi from 'api/misc';
import MiscActions from 'redux/misc/actions';

import {
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  DELETE_IMAGE,
  ADD_IMAGE,
  EDIT_IMAGE,
  UploadImageAction,
  UploadImageSuccessPayload,
  AddImageAction,
  EditImageAction,
  DeleteImageAction,
} from './types';
import PostFormActions from './actions';
import RequestStatusActions from 'redux/request-status/actions';
import { getFileFromUrl } from 'utils/image';
import { selectImagePaths } from './selectors';
import { InlineResponse200 } from 'interfaces';

/**
 * Upload image
 */
export function* uploadImageRequest() {
  yield takeEvery(UPLOAD_IMAGE_REQUEST, function* ({
    payload,
  }: UploadImageAction) {
    yield put(RequestStatusActions.startRequest(UPLOAD_IMAGE_REQUEST));
    try {
      const response = yield call(MiscApi.uploadFile, payload.request);

      yield put({
        type: UPLOAD_IMAGE_SUCCESS,
        payload: {
          id: payload.id,
          response,
        } as UploadImageSuccessPayload,
      });
      yield put(RequestStatusActions.finishRequest(UPLOAD_IMAGE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UPLOAD_IMAGE_REQUEST, err));
    }
  });
}

/**
 * Add image
 */
export function* addImage() {
  yield takeEvery(ADD_IMAGE, function* ({ payload }: AddImageAction) {
    const file = yield call(getFileFromUrl, payload.blobUrl);
    // TODO: Check if upload id is matched

    yield put(PostFormActions.uploadImage(payload.id, file, 'post'));
  });
}

/**
 * Edit image
 */
export function* editImage() {
  yield takeEvery(EDIT_IMAGE, function* ({ payload }: EditImageAction) {
    const file = yield call(getFileFromUrl, payload.blobUrl);

    const paths = (yield select(selectImagePaths)) as {
      [t: number]: InlineResponse200;
    };
    yield put(MiscActions.deleteFile(paths[payload.id]?.file || ''));
    yield put(PostFormActions.uploadImage(payload.id, file, 'post'));
  });
}

/**
 * Remove image
 */
export function* deleteImage() {
  yield takeEvery(DELETE_IMAGE, function* ({ payload }: DeleteImageAction) {
    const paths = (yield select(selectImagePaths)) as {
      [t: number]: InlineResponse200;
    };
    yield put(PostFormActions.removeImage(payload));
    yield put(MiscActions.deleteFile(paths[payload]?.file || ''));
  });
}

/**
 * Delete image from S3
 */

export default function* rootSaga() {
  yield all([
    fork(uploadImageRequest),
    fork(addImage),
    fork(editImage),
    fork(deleteImage),
  ]);
}
