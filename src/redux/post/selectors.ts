import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';
import { Post } from 'interfaces';
import { PostModel } from 'models/post';
import sort from 'fast-sort';

export const selectGlobal = (state: RootState) => state.Post || initState;

export const selectHomeFeed = createSelector(selectGlobal, (state) =>
  sort([...state.feedData.home[0]]).desc((p: Post) => p.createdAt),
);

export const selectPromotedFeed = createSelector(selectGlobal, (state) =>
  sort([...state.feedData.promoted[0]]).desc((p: Post) => p.createdAt),
);

export const selectFeed = createSelector(
  selectGlobal,
  (state) => state.feedData,
);

export const selectFeedResponse = createSelector(
  selectGlobal,
  (state) => state.feedResponse,
);

export const selectComments = createSelector(
  selectGlobal,
  (state) => state.pageData.comments,
);

export const selectCommentsResponses = createSelector(
  selectGlobal,
  (state) => state.pageResponse.comments,
);

export const selectCurrentPost = createSelector(
  selectGlobal,
  ({ currentPostId, posts }) =>
    currentPostId in posts ? (posts[currentPostId] as PostModel) : null,
);

export const selectCurrentPostId = createSelector(
  selectGlobal,
  (state) => state.currentPostId,
);

export const selectCurrentPostComments = createSelector(
  [selectComments, selectCurrentPostId],
  (comments, postId) => comments[JSON.stringify({ postId })],
);

export const selectCurrentPostCommentsResponse = createSelector(
  [selectCommentsResponses, selectCurrentPostId],
  (responses, postId) => responses[JSON.stringify({ postId })],
);

export const selectCurrentPostCommentsReachedLastPage = createSelector(
  selectCurrentPostCommentsResponse,
  (response) => (response ? response.currentPage >= response.lastPage : true),
);

export const selectHasMoreHomeFeed = createSelector(
  selectGlobal,
  (state) => state.feedResponse.home[0]?.offset !== 0,
);

export const selectHasMorePromotedFeed = createSelector(
  selectGlobal,
  (state) => state.feedResponse.promoted[0]?.offset !== 0,
);
