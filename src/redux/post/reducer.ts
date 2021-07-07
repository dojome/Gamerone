import produce from 'immer';

import {
  ADD_POST_SUCCESS,
  LOAD_FEED_SUCCESS,
  UP_VOTE_SUCCESS,
  DOWN_VOTE_SUCCESS,
  // GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  LOAD_PAGE_SUCCESS,
  PostState,
  PostActionTypes,
  LOAD_POST_DETAIL_REQUEST,
  LOAD_POST_DETAIL_SUCCESS,
  DELETE_POST_SUCCESS,
  LOAD_INITIAL_FEED,
} from './types';

import { PostModel } from 'models/post';
import { INIT_STATE } from 'redux/types';
import { PostUser } from 'interfaces/postUser';
import { Post } from 'interfaces';

export const initState: PostState = {
  pageData: {
    comments: {},
  },

  pageResponse: {
    comments: {},
  },

  feedData: {
    home: {
      0: [],
    },
    user: {},
    game: {},
    club: {},
    private: {
      0: [],
    },
    promoted: {
      0: [],
    },
  },

  feedResponse: {
    home: {},
    user: {},
    game: {},
    club: {},
    private: {},
    promoted: {},
  },

  currentPostId: 0,
  posts: {},
};

export default function miscReducer(
  state = initState,
  action: PostActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        Object.assign(draft, initState);
        break;

      case LOAD_INITIAL_FEED:
        break;

      case ADD_POST_SUCCESS:
        // Unless feed is not yet requested, prepends the new post to the feed
        if (state.feedResponse.home[0] !== undefined) {
          draft.feedData.home[0].unshift(
            new PostModel().fromPostUserDto(action.payload as PostUser),
          );
        }

        // Unless private feed is not yet requested, prepends the new post to the feed
        if (state.feedResponse.private[0] !== undefined) {
          draft.feedData.private[0].unshift(
            new PostModel().fromPostUserDto(action.payload as PostUser),
          );
        }
        break;

      case DELETE_POST_SUCCESS:
        {
          // Delete from posts cache
          const id = action.payload;
          if (id in draft.posts) {
            delete draft.posts[id];
          }

          // Delete from feeds cache
          for (const key in state.feedData) {
            for (const userId in state.feedData[key]) {
              const idx = state.feedData[key][Number(userId)].findIndex(
                (post: Post) => post.id === id,
              );

              if (idx > -1) {
                draft.feedData[key][Number(userId)].splice(idx, 1);
              }
            }
          }
        }
        break;

      case LOAD_PAGE_SUCCESS: {
        const { key, response, param } = action.payload;
        const stringifiedParam = JSON.stringify(param);

        if (stringifiedParam in draft.pageData[key]) {
          draft.pageData[key][stringifiedParam].push(...response.data);
        } else {
          draft.pageData[key][stringifiedParam] = [...response.data];
        }

        draft.pageResponse[key][stringifiedParam] = response;
        break;
      }

      case LOAD_FEED_SUCCESS: {
        const { key, response, dataId } = action.payload;

        if (dataId in draft.feedData[key]) {
          draft.feedData[key][dataId].push(
            ...response.posts.map((p) => new PostModel().fromPostUserDto(p)),
          );
        } else {
          draft.feedData[key][dataId] = [
            ...response.posts.map((p) => new PostModel().fromPostUserDto(p)),
          ];
        }

        draft.feedResponse[key][dataId] = response;
        break;
      }

      case ADD_COMMENT_SUCCESS:
        {
          const { id, comment } = action.payload;
          const stringifiedParam = JSON.stringify({ postId: id });

          // Update comments
          if (stringifiedParam in draft.pageData.comments) {
            draft.pageData.comments[stringifiedParam].push(comment);
          } else {
            draft.pageData.comments[stringifiedParam] = [comment];
          }

          // Update comment count
          if (id in draft.posts) {
            draft.posts[id] = {
              ...draft.posts[id],
              commentCount: draft.posts[id].commentCount + 1,
            };
          }
        }
        break;

      case UP_VOTE_SUCCESS:
      case DOWN_VOTE_SUCCESS:
        {
          // Update in posts cache
          const { id } = action.payload;
          if (id in draft.posts) {
            draft.posts[id] = new PostModel().fromPostUserDto(
              action.payload as PostUser,
            );
          }

          // Update in feeds cache
          for (const key in state.feedData) {
            for (const userId in state.feedData[key]) {
              const idx = state.feedData[key][Number(userId)].findIndex(
                (post: Post) => post.id === action.payload.id,
              );

              if (idx > -1)
                draft.feedData[key][Number(userId)][
                  idx
                ] = new PostModel().fromPostUserDto(action.payload as PostUser);
            }
          }
        }
        break;

      case LOAD_POST_DETAIL_REQUEST:
        draft.currentPostId = action.payload;
        break;

      case LOAD_POST_DETAIL_SUCCESS:
        draft.posts[action.payload.id] = new PostModel().fromPostUserDto(
          action.payload as PostUser,
        );
        break;

      default:
        break;
    }
  });
}
