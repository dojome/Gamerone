import { PostCommentRequest } from './../../interfaces/postCommentRequest';
import {
  ADD_POST_REQUEST,
  ADD_COMMENT_REQUEST,
  LOAD_PAGE_REQUEST,
  LOAD_NEXT_PAGE,
  LOAD_INITIAL_PAGE,
  DOWN_VOTE_REQUEST,
  UP_VOTE_REQUEST,
  PAGE_DATA,
  AddPostAction,
  UpVoteAction,
  DownVoteAction,
  AddCommentAction,
  LoadPageActionPayload,
  LoadNextPageAction,
  LoadInitialPageAction,
  PageApiParam,
  LoadInitialFeedAction,
  LOAD_INITIAL_FEED,
  FEED_DATA,
  LOAD_NEXT_FEED,
  LoadNextFeedAction,
  LoadPostDetailAction,
  LOAD_POST_DETAIL_REQUEST,
  SharePostAction,
  SHARE_POST,
  DeletePostAction,
  DELETE_POST_REQUEST,
} from './types';
import { PostRequest } from 'interfaces';

export default {
  // post
  addNewPost: (payload: PostRequest): AddPostAction => ({
    type: ADD_POST_REQUEST,
    payload,
  }),

  deletePost: (payload: number): DeletePostAction => ({
    type: DELETE_POST_REQUEST,
    payload,
  }),

  loadFeed: (key: FEED_DATA, dataId = 0): LoadInitialFeedAction => ({
    type: LOAD_INITIAL_FEED,
    payload: {
      key,
      dataId,
    },
  }),

  loadNextFeed: (key: FEED_DATA, dataId = 0): LoadNextFeedAction => ({
    type: LOAD_NEXT_FEED,
    payload: {
      key,
      dataId,
    },
  }),

  upVote: (payload: number): UpVoteAction => ({
    type: UP_VOTE_REQUEST,
    payload,
  }),

  downVote: (payload: number): DownVoteAction => ({
    type: DOWN_VOTE_REQUEST,
    payload,
  }),

  addComment: (id: number, request: PostCommentRequest): AddCommentAction => ({
    type: ADD_COMMENT_REQUEST,
    payload: {
      id,
      request,
    },
  }),

  // comments modal
  loadPostDetail: (payload: number): LoadPostDetailAction => ({
    type: LOAD_POST_DETAIL_REQUEST,
    payload,
  }),

  // pagination (comments, posts)
  loadPage: (payload: LoadPageActionPayload) => ({
    type: LOAD_PAGE_REQUEST,
    payload,
  }),

  loadNextPage: (key: PAGE_DATA, param: PageApiParam): LoadNextPageAction => ({
    type: LOAD_NEXT_PAGE,
    payload: {
      key,
      param,
    },
  }),

  loadInitialPage: (
    key: PAGE_DATA,
    param: PageApiParam,
  ): LoadInitialPageAction => ({
    type: LOAD_INITIAL_PAGE,
    payload: {
      key,
      param,
    },
  }),

  // share post
  sharePost: (url: string, content: string): SharePostAction => ({
    type: SHARE_POST,
    payload: {
      url,
      content,
    },
  }),
};
