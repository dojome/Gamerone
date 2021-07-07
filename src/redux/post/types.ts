import { PostCommentRequest } from 'interfaces/postCommentRequest';
import {
  PostRequest,
  Post,
  CommentPagedResponse,
  PagedResponse,
  Nullable,
  PagedPost,
} from 'interfaces';
import { Comment } from 'interfaces';
import { GetPostCommentsParam } from 'api/post';
import { RootStateActions } from 'redux/types';

/**
 * Posts
 */
export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';

export const DELETE_POST_REQUEST = 'post/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';

/**
 * Vote
 */
export const UP_VOTE_REQUEST = 'post/UP_VOTE_REQUEST';
export const UP_VOTE_SUCCESS = 'post/UP_VOTE_SUCCESS';

export const DOWN_VOTE_REQUEST = 'post/DOWN_VOTE_REQUEST';
export const DOWN_VOTE_SUCCESS = 'post/DOWN_VOTE_SUCCESS';

/*
 * Comments
 */
export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';

export const LOAD_POST_DETAIL_REQUEST = 'post/LOAD_POST_DETAIL_REQUEST';
export const LOAD_POST_DETAIL_SUCCESS = 'post/LOAD_POST_DETAIL_SUCCESS';

/**
 * Pagination
 */
export const LOAD_PAGE_REQUEST = 'post/LOAD_PAGE_REQUEST';
export const LOAD_PAGE_SUCCESS = 'post/LOAD_PAGE_SUCCESS';
export const LOAD_NEXT_PAGE = 'post/LOAD_NEXT_PAGE';
export const LOAD_INITIAL_PAGE = 'post/LOAD_INITIAL_PAGE';

export type PAGE_DATA = 'comments';
export type PageApiParam = GetPostCommentsParam;

/**
 * Feed
 */
export type FEED_DATA =
  | 'user'
  | 'home'
  | 'game'
  | 'club'
  | 'private'
  | 'promoted';
export type FeedApi = (id: number, o?: number) => Promise<any>;

export const LOAD_FEED_REQUEST = 'post/LOAD_FEED_REQUEST';
export const LOAD_FEED_SUCCESS = 'post/LOAD_FEED_SUCCESS';
export const LOAD_NEXT_FEED = 'post/LOAD_NEXT_FEED';
export const LOAD_INITIAL_FEED = 'post/LOAD_INITIAL_FEED';

/**
 * Post Share
 */
export const SHARE_POST = 'post/SHARE_POST';

/**
 * Actions
 */
export interface AddPostAction {
  type: typeof ADD_POST_REQUEST;
  payload: PostRequest;
}

export interface AddPostSuccessAction {
  type: typeof ADD_POST_SUCCESS;
  payload: Post;
}

export interface DeletePostAction {
  type: typeof DELETE_POST_REQUEST;
  payload: number;
}

export interface DeletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS;
  payload: number;
}

export interface UpVoteAction {
  type: typeof UP_VOTE_REQUEST;
  payload: number;
}

export interface DownVoteAction {
  type: typeof DOWN_VOTE_REQUEST;
  payload: number;
}

export interface UpVoteSuccessAction {
  type: typeof UP_VOTE_SUCCESS;
  payload: Post;
}

export interface DownVoteSuccessAction {
  type: typeof DOWN_VOTE_SUCCESS;
  payload: Post;
}

export interface AddCommentAction {
  type: typeof ADD_COMMENT_REQUEST;
  payload: AddCommentActionPayload;
}

export interface AddCommentActionPayload {
  id: number;
  request: PostCommentRequest;
}

export interface AddCommentSuccessAction {
  type: typeof ADD_COMMENT_SUCCESS;
  payload: AddCommentSuccessActionPayload;
}

export interface AddCommentSuccessActionPayload {
  id: number;
  comment: Comment;
}

// Load Post
export interface LoadPostDetailAction {
  type: typeof LOAD_POST_DETAIL_REQUEST;
  payload: number;
}

export interface LoadPostDetailSuccessAction {
  type: typeof LOAD_POST_DETAIL_SUCCESS;
  payload: Post;
}

// Feed
export interface LoadFeedAction {
  type: typeof LOAD_FEED_REQUEST;
  payload: LoadFeedActionPayload;
}

export interface LoadFeedActionPayload {
  key: FEED_DATA;
  offset?: number;
  dataId: number;
  dataApi: FeedApi;
}

export interface LoadNextFeedAction {
  type: typeof LOAD_NEXT_FEED;
  payload: LoadNextFeedActionPayload;
}

export interface LoadInitialFeedAction {
  type: typeof LOAD_INITIAL_FEED;
  payload: LoadNextFeedActionPayload;
}

export interface LoadNextFeedActionPayload {
  key: FEED_DATA;
  dataId: number;
}

export interface LoadFeedSuccessAction {
  type: typeof LOAD_FEED_SUCCESS;
  payload: LoadFeedSuccessActionPayload;
}

export interface LoadFeedSuccessActionPayload {
  key: FEED_DATA;
  dataId: number;
  response: PagedPost;
}

// Pagination
export interface LoadPageAction {
  type: typeof LOAD_PAGE_REQUEST;
  payload: LoadPageActionPayload;
}

export interface LoadPageActionPayload {
  key: PAGE_DATA;
  page: number;
  param: PageApiParam;
  dataApi: (param: PageApiParam, p?: number) => Promise<any>;
}

export interface LoadNextPageAction {
  type: typeof LOAD_NEXT_PAGE;
  payload: LoadNextPageActionPayload;
}

export interface LoadInitialPageAction {
  type: typeof LOAD_INITIAL_PAGE;
  payload: LoadNextPageActionPayload;
}

export interface LoadNextPageActionPayload {
  key: PAGE_DATA;
  param: PageApiParam;
}

export interface LoadPageSuccessAction {
  type: typeof LOAD_PAGE_SUCCESS;
  payload: LoadPageSuccessActionPayload;
}

export interface LoadPageSuccessActionPayload {
  key: PAGE_DATA;
  param: PageApiParam;
  response: CommentPagedResponse;
}

export interface SharePostActionPayload {
  url: string;
  content: string;
}
export interface SharePostAction {
  type: typeof SHARE_POST;
  payload: SharePostActionPayload;
}

export interface PostState {
  pageData: {
    [key in PAGE_DATA]: { [param: string]: Array<Comment> };
  };

  pageResponse: {
    [key in PAGE_DATA]: { [param: string]: Nullable<PagedResponse> };
  };

  feedData: {
    [key in FEED_DATA]: { [param: number]: Array<Post> };
  };

  feedResponse: {
    [key in FEED_DATA]: { [param: number]: PagedPost };
  };

  /* The lastly showed comments modal's post id */
  currentPostId: number;
  posts: {
    [id: number]: Post;
  };
}

export type PostActionTypes =
  // inherited actions
  | RootStateActions
  // post actions
  | AddPostAction
  | AddPostSuccessAction
  | DeletePostAction
  | DeletePostSuccessAction
  | LoadFeedAction
  | LoadInitialFeedAction
  | LoadNextFeedAction
  | LoadFeedSuccessAction
  | UpVoteAction
  | DownVoteAction
  | UpVoteSuccessAction
  | DownVoteSuccessAction
  | AddCommentAction
  | AddCommentSuccessAction
  | LoadPostDetailAction
  | LoadPostDetailSuccessAction
  | LoadPageSuccessAction
  | LoadNextPageAction
  | SharePostAction;
