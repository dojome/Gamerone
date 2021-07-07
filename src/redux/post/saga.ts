import { call, all, takeLatest, put, fork, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as PostApi from 'api/post';
import * as FeedAPI from 'api/feed';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_FEED_REQUEST,
  LOAD_FEED_SUCCESS,
  UP_VOTE_REQUEST,
  UP_VOTE_SUCCESS,
  DOWN_VOTE_REQUEST,
  DOWN_VOTE_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LOAD_PAGE_REQUEST,
  LOAD_PAGE_SUCCESS,
  LOAD_NEXT_PAGE,
  LOAD_INITIAL_PAGE,
  AddPostAction,
  AddCommentAction,
  DownVoteAction,
  UpVoteAction,
  LoadPageAction,
  LoadNextPageAction,
  LoadPageActionPayload,
  LoadInitialPageAction,
  LoadPageSuccessActionPayload,
  LoadFeedAction,
  FeedApi,
  FEED_DATA,
  LoadFeedSuccessActionPayload,
  LOAD_INITIAL_FEED,
  LoadInitialFeedAction,
  LOAD_NEXT_FEED,
  LoadNextFeedAction,
  LoadFeedActionPayload,
  LOAD_POST_DETAIL_REQUEST,
  LOAD_POST_DETAIL_SUCCESS,
  LoadPostDetailAction,
  SHARE_POST,
  SharePostAction,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DeletePostAction,
  DeletePostSuccessAction,
} from './types';
import RequestStatusActions from 'redux/request-status/actions';
import PostFormActions from 'redux/post-form/actions';
import DialogActions from 'redux/dialogs/actions';
import PostActions from './actions';
import { PagedResponse, PagedPost } from 'interfaces';
import { RootState } from 'redux/types';
import { selectCurrentPost } from './selectors';
import { selectIsAuthenticated } from 'redux/auth/selectors';
import { Notify } from 'components/utility/Notify';
import { DialogTypeEnum } from 'redux/dialogs/types';

const PageApi = {
  comments: PostApi.getPostComments,
};

const FeedAPIs: { [key in FEED_DATA]: FeedApi } = {
  user: FeedAPI.getUserFeed,
  club: FeedAPI.getClubFeed,
  game: FeedAPI.getGameFeed,
  private: FeedAPI.getPrivateFeed,
  home: FeedAPI.getHomeFeed,
  promoted: FeedAPI.getPromotedFeed,
};

/**
 * Add new post
 */
export function* addPostRequest() {
  yield takeLatest(ADD_POST_REQUEST, function* ({ payload }: AddPostAction) {
    yield put(RequestStatusActions.startRequest(ADD_POST_REQUEST));
    yield put(PostFormActions.setForm(payload));

    try {
      const newPost = yield call(PostApi.addNewPost, payload);
      yield put({
        type: ADD_POST_SUCCESS,
        payload: newPost,
      });
      yield put(RequestStatusActions.finishRequest(ADD_POST_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_POST_REQUEST, err));
    }
  });
}

export function* addPostSuccess() {
  yield takeLatest(ADD_POST_SUCCESS, function* () {
    yield put(PostFormActions.initForm());
    yield put(DialogActions.closeDialog(DialogTypeEnum.NEW_POST));
  });
}

/**
 * Delete post
 */

export function* deletePostRequest() {
  yield takeLatest(DELETE_POST_REQUEST, function* ({
    payload,
  }: DeletePostAction) {
    yield put(RequestStatusActions.startRequest(DELETE_POST_REQUEST));

    try {
      yield call(PostApi.deletePost, payload);
      yield put({
        type: DELETE_POST_SUCCESS,
        payload,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_POST_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_POST_REQUEST, err));
    }
  });
}

export function* deletePostSuccess() {
  yield takeLatest(DELETE_POST_SUCCESS, function* ({
    payload,
  }: DeletePostSuccessAction) {
    const path = yield select(
      (state: RootState) => state.router.location.pathname,
    );

    // eslint-disable-next-line no-useless-escape
    if (path && RegExp(`\/*\/post\/${payload}$`, 'i').test(path as string)) {
      // TODO: Redirect back to previous page
      yield put(push('/'));
    }
  });
}
/**
 * Load Post
 */

export function* loadPostDetailRequest() {
  yield takeLatest(LOAD_POST_DETAIL_REQUEST, function* ({
    payload,
  }: LoadPostDetailAction) {
    yield put(
      PostActions.loadInitialPage('comments', {
        postId: payload,
      }),
    );

    const currentPost = yield select(selectCurrentPost);
    if (currentPost) return;

    // Retrieve post with given id
    yield put(RequestStatusActions.startRequest(LOAD_POST_DETAIL_REQUEST));
    try {
      const response = yield call(PostApi.getPost, payload);
      yield put({
        type: LOAD_POST_DETAIL_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(LOAD_POST_DETAIL_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(LOAD_POST_DETAIL_REQUEST, err),
      );
    }
  });
}

/**
 * Feed
 */
export function* loadFeedRequest() {
  yield takeLatest(LOAD_FEED_REQUEST, function* ({ payload }: LoadFeedAction) {
    const { key, dataId, offset, dataApi } = payload;
    const REQUEST_NAME = LOAD_FEED_REQUEST + '/' + key;

    yield put(RequestStatusActions.startRequest(REQUEST_NAME));

    try {
      const response = yield call<typeof dataApi>(dataApi, dataId, offset);
      yield put({
        type: LOAD_FEED_SUCCESS,
        payload: {
          key,
          response,
          dataId,
        } as LoadFeedSuccessActionPayload,
      });

      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, null));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, err));
    }
  });
}

export function* loadInitialFeed() {
  yield takeLatest(LOAD_INITIAL_FEED, function* ({
    payload,
  }: LoadInitialFeedAction) {
    const { key, dataId } = payload;
    const currentResponse = yield select(
      ({ Post }: RootState) => Post.feedResponse[key][dataId],
    );

    if (currentResponse === undefined) {
      yield put({
        type: LOAD_NEXT_FEED,
        payload,
      });
    }
  });
}

export function* loadNextFeed() {
  yield takeLatest(LOAD_NEXT_FEED, function* ({ payload }: LoadNextFeedAction) {
    const { key, dataId } = payload;
    const currentResponse = (yield select(
      ({ Post }: RootState) => Post.feedResponse[key][dataId],
    )) as PagedPost | undefined;

    const requestPayload = {
      key,
      dataId,
      offset: currentResponse ? currentResponse.offset : undefined,
      dataApi: FeedAPIs[key],
    } as LoadFeedActionPayload;

    if (
      !currentResponse ||
      requestPayload.offset === undefined ||
      requestPayload.offset > 0
    )
      yield put({
        type: LOAD_FEED_REQUEST,
        payload: requestPayload,
      });
    else {
      // Reached feed end
    }
  });
}

/**
 * Vote
 */
export function* upVoteRequest() {
  yield takeLatest(UP_VOTE_REQUEST, function* ({ payload }: UpVoteAction) {
    const isAuthenticated = yield select(selectIsAuthenticated);
    if (!isAuthenticated) {
      Notify.warning('You should sign in to vote');
      return;
    }

    yield put(RequestStatusActions.startRequest(UP_VOTE_REQUEST));

    try {
      const response = yield call(PostApi.upVotePost, payload);
      yield put({
        type: UP_VOTE_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(UP_VOTE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UP_VOTE_REQUEST, err));
    }
  });
}

export function* downVoteRequest() {
  yield takeLatest(DOWN_VOTE_REQUEST, function* ({ payload }: DownVoteAction) {
    const isAuthenticated = yield select(selectIsAuthenticated);
    if (!isAuthenticated) {
      Notify.warning('You should sign in to vote');
      return;
    }

    yield put(RequestStatusActions.startRequest(DOWN_VOTE_REQUEST));
    try {
      const response = yield call(PostApi.downVotePost, payload);
      yield put({
        type: DOWN_VOTE_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(DOWN_VOTE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DOWN_VOTE_REQUEST, err));
    }
  });
}

/**
 * Pagination
 */
export function* loadPageRequest() {
  yield takeLatest(LOAD_PAGE_REQUEST, function* ({ payload }: LoadPageAction) {
    const { key, page, param, dataApi } = payload;
    const REQUEST_NAME = LOAD_PAGE_REQUEST + '/' + key;

    yield put(RequestStatusActions.startRequest(REQUEST_NAME));

    try {
      const response = yield call<typeof dataApi>(dataApi, param, page);
      yield put({
        type: LOAD_PAGE_SUCCESS,
        payload: {
          key,
          response,
          param,
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
    payload,
  }: LoadInitialPageAction) {
    const { key, param } = payload;
    const currentResponse = yield select(
      ({ Post }: RootState) => Post.pageResponse[key][JSON.stringify(param)],
    );

    if (currentResponse === undefined) {
      yield put({
        type: LOAD_NEXT_PAGE,
        payload,
      });
    }
  });
}

export function* loadNextPage() {
  yield takeLatest(LOAD_NEXT_PAGE, function* ({ payload }: LoadNextPageAction) {
    const { key, param } = payload;
    const currentResponse = (yield select(
      ({ Post }: RootState) => Post.pageResponse[key][JSON.stringify(param)],
    )) as PagedResponse | undefined;

    const requestPayload = {
      key,
      param,
      page: currentResponse ? currentResponse.currentPage + 1 : 0,
      dataApi: PageApi[key],
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

/*
 * Comments
 */

export function* addCommentRequest() {
  yield takeLatest(ADD_COMMENT_REQUEST, function* ({
    payload,
  }: AddCommentAction) {
    yield put(RequestStatusActions.startRequest(ADD_COMMENT_REQUEST));

    const { id, request } = payload;
    try {
      const response = yield call(PostApi.addComment, id, request);
      yield put({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          id,
          comment: response,
        },
      });
      yield put(RequestStatusActions.finishRequest(ADD_COMMENT_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_COMMENT_REQUEST, err));
    }
  });
}

/**
 * Share
 */
export function* sharePost() {
  yield takeLatest(SHARE_POST, function* ({ payload }: SharePostAction) {
    yield put(DialogActions.showDialog(DialogTypeEnum.SHARE, true, payload));
  });
}

export default function* rootSaga() {
  yield all([
    fork(addPostRequest),
    fork(addPostSuccess),

    fork(deletePostRequest),
    fork(deletePostSuccess),

    fork(loadPostDetailRequest),

    fork(loadFeedRequest),
    fork(loadNextFeed),
    fork(loadInitialFeed),

    fork(upVoteRequest),
    fork(downVoteRequest),

    fork(addCommentRequest),

    fork(loadPageRequest),
    fork(loadNextPage),
    fork(loadInitialPage),

    fork(sharePost),
  ]);
}
