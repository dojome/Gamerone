import {
  call,
  all,
  put,
  fork,
  take,
  takeLatest,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';

import * as ProfileApi from 'api/profile';
import * as FriendsApi from 'api/friends';
import * as SquadApi from 'api/squad';
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_ERROR,
  GET_PROFILE_SUCCESS,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  BLOCK_REQUEST,
  BLOCK_SUCCESS,
  UNBLOCK_REQUEST,
  UNBLOCK_SUCCESS,
  SET_RESOLVED_CONTENT,
  MULTI_FOLLOW_REQUEST,
  MULTI_FOLLOW_SUCCESS,
  GetProfileAction,
  SetResolvedContentAction,
  FollowAction,
  UnfollowAction,
  BlockAction,
  UnblockAction,
  MultiFollowAction,
  GET_PROFILE_LAYOUT_REQUEST,
  GET_PROFILE_LAYOUT_SUCCESS,
  GET_PROFILE_LAYOUT_ERROR,
  SET_CURRENT_PROFILE_LAYOUT_REQUEST,
  SET_CURRENT_PROFILE_LAYOUT_ERROR,
  SetCurrentProfileLayoutAction,
  LOAD_PAGE_REQUEST,
  LoadPageAction,
  LOAD_PAGE_SUCCESS,
  LoadPageSuccessActionPayload,
  LOAD_INITIAL_PAGE,
  LoadInitialPageAction,
  LOAD_NEXT_PAGE,
  LoadNextPageAction,
  LoadPageActionPayload,
  GET_SQUAD_REQUEST,
  GET_SQUAD_SUCCESS,
  ADD_SQUAD_REQUEST,
  ADD_SQUAD_SUCCESS,
  GetSquadAction,
  AddSquadAction,
  UnfollowSuccessAction,
  REMOVE_FOLLOWING,
  REMOVE_FOLLOWER,
  ADD_FOLLOWING,
  ADD_FOLLOWER,
  FollowSuccessAction,
  GET_EXPERIENCES_REQUEST,
  GET_EXPERIENCES_SUCCESS,
  GetExperiencesAction,
  GET_EXPERIENCE_SUMMARY_REQUEST,
  GET_EXPERIENCE_SUMMARY_SUCCESS,
} from './types';
import { selectCurrentProfileId, selectCurrentProfileUser } from './selectors';
import { User } from 'interfaces';

import RequestStatusActions from 'redux/request-status/actions';
import ProfileActions from './actions';
import PostActions from 'redux/post/actions';
import SettingsActions from 'redux/settings/actions';
import { RootState, LOAD_STATE } from 'redux/types';
import { UserPagedResponse } from 'interfaces/userPagedResponse';
import { Nullable } from 'interfaces';
import { UPDATE_LAYOUT_SETTINGS } from 'redux/settings/types';
import { selectCurrentUser, selectCurrentUserId } from 'redux/auth/selectors';
import {
  CHECK_AUTHORIZATION_SUCCESS,
  CHECK_AUTHORIZATION,
} from 'redux/auth/types';
import { selectInProgressRequests } from 'redux/request-status/selectors';
import { selectSettingsProfileUser } from 'redux/settings/selectors';

const PagedApi = {
  followers: FriendsApi.followers,
  followings: FriendsApi.following,
  games: ProfileApi.getUserGames,
  gears: ProfileApi.getUserGears,
};

/**
 * Get profile
 */
export function* getProfileRequest() {
  yield takeLatest(GET_PROFILE_REQUEST, function* ({
    payload,
  }: GetProfileAction) {
    yield put(RequestStatusActions.startRequest(GET_PROFILE_REQUEST));

    try {
      const response = yield call(ProfileApi.getProfile, payload);
      yield put({
        type: GET_PROFILE_SUCCESS,
        payload: response,
      });

      yield put(RequestStatusActions.finishRequest(GET_PROFILE_REQUEST));
    } catch (err) {
      yield put({ type: GET_PROFILE_ERROR });
      yield put(RequestStatusActions.finishRequest(GET_PROFILE_REQUEST, err));
    }
  });
}

/**
 * Get profile layout
 */
export function* getProfileLayoutRequest() {
  yield takeLatest(GET_PROFILE_LAYOUT_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_PROFILE_LAYOUT_REQUEST));

    try {
      const response = yield call(ProfileApi.getProfileLayout);
      yield put({
        type: GET_PROFILE_LAYOUT_SUCCESS,
        payload: response,
      });

      yield put(RequestStatusActions.finishRequest(GET_PROFILE_LAYOUT_REQUEST));
    } catch (err) {
      yield put({ type: GET_PROFILE_LAYOUT_ERROR });
      yield put(
        RequestStatusActions.finishRequest(GET_PROFILE_LAYOUT_REQUEST, err),
      );
    }
  });
}

export function* setProfileLayoutRequest() {
  yield takeLatest(SET_CURRENT_PROFILE_LAYOUT_REQUEST, function* ({
    payload,
  }: SetCurrentProfileLayoutAction) {
    yield put(
      RequestStatusActions.startRequest(SET_CURRENT_PROFILE_LAYOUT_REQUEST),
    );

    try {
      const response = yield call(ProfileApi.setProfileLayout, payload);

      yield put({
        type: GET_PROFILE_LAYOUT_SUCCESS,
        payload: response,
      });

      yield put({
        type: UPDATE_LAYOUT_SETTINGS,
        payload: response,
      });

      yield put(
        RequestStatusActions.finishRequest(SET_CURRENT_PROFILE_LAYOUT_REQUEST),
      );
      // Notify.success('Successfully updated your profile layout settings');
    } catch (err) {
      yield put({ type: SET_CURRENT_PROFILE_LAYOUT_ERROR });

      yield put(
        RequestStatusActions.finishRequest(
          SET_CURRENT_PROFILE_LAYOUT_REQUEST,
          err,
        ),
      );
    }
  });
}

export function* setResolvedContent() {
  yield takeLatest(SET_RESOLVED_CONTENT, function* ({
    payload,
  }: SetResolvedContentAction) {
    if (payload.contentId) {
      // Trying to get current auth user
      let currentUser = (yield select(selectCurrentUser)) as User;

      // If auth user is empty
      if (currentUser.id === 0) {
        const currentRequests = (yield select(
          selectInProgressRequests,
        )) as string[];

        // If, CHECK_AUTHORIZATION action is in progress, but not yet finished, wait for it succeeds
        if (currentRequests.includes(CHECK_AUTHORIZATION))
          yield take(CHECK_AUTHORIZATION_SUCCESS);
      }

      // Reselect currentUser
      currentUser = (yield select(selectCurrentUser)) as User;
      const isSelfProfile = currentUser.id === payload.contentId;

      // Load Profile and Squad
      yield put(ProfileActions.getProfile(payload.contentId));
      yield put(ProfileActions.getSquad(payload.contentId));

      // Load Feed and gears
      if (isSelfProfile) {
        yield put(PostActions.loadFeed('private'));
        yield put(SettingsActions.loadInitialPage('gears'));
      } else {
        if (payload.contentType) {
          yield put(
            PostActions.loadFeed(payload.contentType, payload.contentId),
          );
        } else {
          throw new Error('Unidentified content type');
        }

        yield put(ProfileActions.loadInitialPage('gears'));
      }
    } else {
      throw new Error('Content id is undefined');
    }
  });
}

/**
 * FOLLOW
 *
 * Friends api responses are placeholders [temporary]
 */
export function* followRequest() {
  yield takeLatest(FOLLOW_REQUEST, function* ({ payload }: FollowAction) {
    yield put(RequestStatusActions.startRequest(FOLLOW_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.follow, id);

      yield put({ type: FOLLOW_SUCCESS, payload: id });

      yield put(RequestStatusActions.finishRequest(FOLLOW_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(FOLLOW_REQUEST, err));
    }
  });
}

export function* followSuccess() {
  yield takeEvery(FOLLOW_SUCCESS, function* ({ payload }: FollowSuccessAction) {
    const myUserId = yield select(selectCurrentUserId);
    const currentProfileId = yield select(selectCurrentProfileId);

    const me = yield select(selectSettingsProfileUser);
    const other = yield select(selectCurrentProfileUser);

    if (currentProfileId === myUserId) {
      // Context: I'm viewing my follower list
      yield put({ type: ADD_FOLLOWING, payload: other });
    } else {
      // Context: I'm viewing other's profile page
      if (payload === currentProfileId) {
        yield put({ type: ADD_FOLLOWER, payload: me });
      } else {
        // No need to update his follower, or my following list
        // because the current viewing page is nor his or my page
      }
    }
  });
}

export function* unfollowRequest() {
  yield takeLatest(UNFOLLOW_REQUEST, function* ({ payload }: UnfollowAction) {
    yield put(RequestStatusActions.startRequest(UNFOLLOW_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.unfollow, id);

      yield put({ type: UNFOLLOW_SUCCESS, payload: id });

      yield put(RequestStatusActions.finishRequest(UNFOLLOW_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UNFOLLOW_REQUEST, err));
    }
  });
}

export function* unfollowSuccess() {
  yield takeEvery(UNFOLLOW_SUCCESS, function* ({
    payload,
  }: UnfollowSuccessAction) {
    const myUserId = yield select(selectCurrentUserId);
    const currentProfileId = yield select(selectCurrentProfileId);

    if (currentProfileId === myUserId) {
      // Context: I'm viewing my following list
      yield put({ type: REMOVE_FOLLOWING, payload });
    } else {
      // Context: I'm viewing other's follower list, where I follow him
      yield put({ type: REMOVE_FOLLOWER, payload: myUserId });
    }
  });
}

export function* blockRequest() {
  yield takeLatest(BLOCK_REQUEST, function* ({ payload }: BlockAction) {
    yield put(RequestStatusActions.startRequest(BLOCK_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.block, id);

      yield put({ type: BLOCK_SUCCESS });

      yield put(RequestStatusActions.finishRequest(BLOCK_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(BLOCK_REQUEST, err));
    }
  });
}

export function* unblockRequest() {
  yield takeLatest(UNBLOCK_REQUEST, function* ({ payload }: UnblockAction) {
    yield put(RequestStatusActions.startRequest(UNBLOCK_REQUEST));

    try {
      const id = payload ? payload : yield select(selectCurrentProfileId);
      yield call(FriendsApi.unblock, id);

      yield put({ type: UNBLOCK_SUCCESS, payload: id });

      yield put(RequestStatusActions.finishRequest(UNBLOCK_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UNBLOCK_REQUEST, err));
    }
  });
}

export function* multiFollowRequest() {
  yield takeLatest(MULTI_FOLLOW_REQUEST, function* ({
    payload,
  }: MultiFollowAction) {
    // this is when user clicks Finish on DiscoverFollows page
    yield put(RequestStatusActions.startRequest(MULTI_FOLLOW_REQUEST));

    try {
      if (payload.userIds.length > 0)
        yield call(FriendsApi.multiFollow, payload);

      yield put({
        type: MULTI_FOLLOW_SUCCESS,
      });
      yield put(RequestStatusActions.finishRequest(MULTI_FOLLOW_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(MULTI_FOLLOW_REQUEST, err));
    } finally {
      yield put({ type: LOAD_STATE });
    }
  });
}

export function* multiFollowSuccess() {
  yield takeLatest(MULTI_FOLLOW_SUCCESS, function* () {
    yield put(push('/'));
  });
}

/**
 * Pagination
 */
export function* loadPageRequest() {
  yield takeLatest(LOAD_PAGE_REQUEST, function* ({ payload }: LoadPageAction) {
    const { key, page, dataApi } = payload;
    const REQUEST_NAME = LOAD_PAGE_REQUEST + '/' + key;

    yield put(RequestStatusActions.startRequest(REQUEST_NAME));

    try {
      let response;
      if (
        key === 'games' ||
        key === 'gears' ||
        key === 'followers' ||
        key === 'followings'
      ) {
        const userId = yield select(selectCurrentProfileId);
        if (userId) {
          response = yield call<typeof dataApi>(dataApi, userId, page);
        } else {
          yield put(RequestStatusActions.finishRequest(REQUEST_NAME, null));
          throw new Error(`Fetching ${key}... UserId cannot be undefined`);
        }
      } else {
        response = yield call<typeof dataApi>(dataApi, page);
      }
      yield put({
        type: LOAD_PAGE_SUCCESS,
        payload: {
          key,
          response,
        } as LoadPageSuccessActionPayload,
      });
      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, null));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, err));
    }
  });
}

export function* loadInitialPage() {
  yield takeLatest(LOAD_INITIAL_PAGE, function* ({
    payload: key,
  }: LoadInitialPageAction) {
    yield put({
      type: LOAD_NEXT_PAGE,
      payload: key,
    });
  });
}

export function* loadNextPage() {
  yield takeLatest(LOAD_NEXT_PAGE, function* ({
    payload: key,
  }: LoadNextPageAction) {
    const currentResponse = (yield select(
      ({ Profile }: RootState) => Profile.pageResponse[key],
    )) as Nullable<UserPagedResponse>;

    const requestPayload = {
      key,
      page: currentResponse ? currentResponse.currentPage + 1 : 0,
      dataApi: PagedApi[key],
    } as LoadPageActionPayload;

    if (!currentResponse || requestPayload.page <= currentResponse.lastPage)
      yield put({
        type: LOAD_PAGE_REQUEST,
        payload: requestPayload,
      });
    else {
      // Reached page end
    }
  });
}

// Squad
export function* getSquadRequest() {
  yield takeLatest(GET_SQUAD_REQUEST, function* ({ payload }: GetSquadAction) {
    yield put(RequestStatusActions.startRequest(GET_SQUAD_REQUEST));

    try {
      let userId;
      if (!payload) {
        userId = yield select(selectCurrentProfileId);
      } else {
        userId = payload;
      }

      const response = yield call(SquadApi.getSquadList, userId);
      yield put({
        type: GET_SQUAD_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(GET_SQUAD_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(GET_SQUAD_REQUEST, err));
    }
  });
}

export function* addSquadRequest() {
  yield takeLatest(ADD_SQUAD_REQUEST, function* ({ payload }: AddSquadAction) {
    yield put(RequestStatusActions.startRequest(ADD_SQUAD_REQUEST));

    try {
      let userId;
      if (!payload) {
        userId = yield select(selectCurrentProfileId);
      } else {
        userId = payload;
      }

      const response = yield call(SquadApi.addToSquad, {
        friendId: userId,
      });
      yield put({
        type: ADD_SQUAD_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(ADD_SQUAD_REQUEST));
      // Notify.success('Invite sent');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_SQUAD_REQUEST, err));
    }
  });
}

export function* getExperiencesRequest() {
  yield takeLatest(GET_EXPERIENCES_REQUEST, function* ({
    payload,
  }: GetExperiencesAction) {
    yield put(RequestStatusActions.startRequest(GET_EXPERIENCES_REQUEST));
    try {
      const userId = payload;
      const experiences = yield call(ProfileApi.getExperiencesById, userId);
      yield put({
        type: GET_EXPERIENCES_SUCCESS,
        payload: experiences,
      });
      yield put(RequestStatusActions.finishRequest(GET_EXPERIENCES_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_EXPERIENCES_REQUEST, err),
      );
    }
  });
}

export function* getExperienceSummaryRequest() {
  yield takeLatest(GET_EXPERIENCE_SUMMARY_REQUEST, function* ({
    payload,
  }: GetExperiencesAction) {
    yield put(
      RequestStatusActions.startRequest(GET_EXPERIENCE_SUMMARY_REQUEST),
    );
    try {
      const userId = payload;
      const userExperienceSummary = yield call(
        ProfileApi.getExperienceSummaryById,
        userId,
      );
      yield put({
        type: GET_EXPERIENCE_SUMMARY_SUCCESS,
        payload: userExperienceSummary,
      });
      yield put(
        RequestStatusActions.finishRequest(GET_EXPERIENCE_SUMMARY_REQUEST),
      );
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_EXPERIENCE_SUMMARY_REQUEST, err),
      );
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getProfileRequest),
    fork(setResolvedContent),
    fork(followRequest),
    fork(unfollowRequest),
    fork(blockRequest),
    fork(unblockRequest),

    fork(getExperiencesRequest),
    fork(getExperienceSummaryRequest),

    fork(followSuccess),
    fork(unfollowSuccess),

    fork(getProfileLayoutRequest),
    fork(setProfileLayoutRequest),

    fork(multiFollowRequest),
    fork(multiFollowSuccess),

    fork(loadPageRequest),
    fork(loadNextPage),
    fork(loadInitialPage),

    fork(getSquadRequest),
    fork(addSquadRequest),
  ]);
}
