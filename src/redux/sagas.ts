import { selectCurrentUserId } from './auth/selectors';
import {
  all,
  select,
  take,
  race,
  takeLatest,
  put,
  fork,
  call,
} from 'redux-saga/effects';

import authSagas from './auth/saga';
import profileSagas from './profile/saga';
import settingsSagas from './settings/saga';
import postSagas from './post/saga';
import postFormSagas from './post-form/saga';
import miscSagas from './misc/saga';

import {
  LOAD_INITIAL_GAMES,
  LOAD_NEXT_GAMES,
  LOAD_EXPERIENCES,
  LOAD_EXPERIENCE_SUMMARY,
} from './types';
import { selectCurrentProfileId } from './profile/selectors';
import { selectIsSelfProfile } from './selectors';
import {
  CHECK_AUTHORIZATION_SUCCESS,
  CHECK_AUTHORIZATION_ERROR,
} from './auth/types';

import SettingsActions from './settings/actions';
import ProfileActions from './profile/actions';
import { getToken } from 'utils/token';

export function* waitUntilAuthFinishes() {
  const currentUserId = yield select(selectCurrentUserId);
  const token = getToken().get('idToken');
  if (token && currentUserId === 0) {
    yield race({
      success: take(CHECK_AUTHORIZATION_SUCCESS),
      error: take(CHECK_AUTHORIZATION_ERROR),
    });
  }
}

function* loadUserExperienceSummary() {
  yield takeLatest(LOAD_EXPERIENCE_SUMMARY, function* () {
    yield call(waitUntilAuthFinishes);

    const userId = yield select(selectCurrentProfileId);
    const isOwner = yield select(selectIsSelfProfile);

    if (isOwner) {
      yield put(SettingsActions.getUserAttributes());
    } else if (userId) {
      yield put(ProfileActions.getExperienceSummary(userId));
    }
  });
}

function* loadUserExperiences() {
  yield takeLatest(LOAD_EXPERIENCES, function* () {
    yield call(waitUntilAuthFinishes);

    const userId = yield select(selectCurrentProfileId);
    const isOwner = yield select(selectIsSelfProfile);

    if (isOwner) {
      yield put(SettingsActions.getExperiences());
    } else if (userId) {
      yield put(ProfileActions.getExperiences(userId));
    }
  });
}

function* loadInitialGames() {
  yield takeLatest(LOAD_INITIAL_GAMES, function* () {
    yield call(waitUntilAuthFinishes);

    const userId = yield select(selectCurrentProfileId);
    const isOwner = yield select(selectIsSelfProfile);

    if (isOwner) {
      yield put(SettingsActions.loadInitialPage('games'));
    } else if (userId) {
      yield put(ProfileActions.loadInitialPage('games'));
    }
  });
}

function* loadNextGames() {
  yield takeLatest(LOAD_NEXT_GAMES, function* () {
    const userId = yield select(selectCurrentProfileId);
    const isOwner = yield select(selectIsSelfProfile);

    if (isOwner) {
      yield put(SettingsActions.loadNextPage('games'));
    } else if (userId) {
      yield put(ProfileActions.loadNextPage('games'));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(loadInitialGames),
    fork(loadNextGames),

    fork(loadUserExperiences),
    fork(loadUserExperienceSummary),

    authSagas(),
    profileSagas(),
    settingsSagas(),
    postSagas(),
    postFormSagas(),
    miscSagas(),
  ]);
}
