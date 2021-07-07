import { PostCommentRequest } from './../interfaces/postCommentRequest';
import request, { stringifyBody } from 'utils/request';
import { PostRequest, Post, StatusResponse, PagedResponse } from 'interfaces';

const requestOptions = (param: any, method = 'POST') => ({
  method,
  body: stringifyBody(param),
});

export interface GetPostsParam {
  userId: number;
}

export interface GetPostCommentsParam {
  postId: number;
}

/**
 * Add a new post
 */
export const addNewPost = (param: PostRequest) => {
  return request<Post>(`/posts`, requestOptions(param));
};

/**
 * Load user's feed posts
 */
export const loadFeed = () => {
  return request<Post[]>('/posts');
};

/**
 * Get profile's posts
 */
export const getPosts = (param: GetPostsParam) => {
  return request<Post[]>(`/posts/user/${param.userId}`);
};

/**
 * Get a post
 */
export const getPost = (id: number) => {
  return request<Post>(`/posts/${id}`);
};

/**
 * Update a post
 */
export const updatePost = (id: number, post: Post) => {
  return request<Post>(`/posts/${id}`, requestOptions(post, 'PATCH'));
};

/**
 * Delete a post
 */
export const deletePost = (id: number) => {
  return request<StatusResponse>(`/posts/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Up vote post
 */
export const upVotePost = (id: number) => {
  return request<Post>(`/posts/${id}/up`);
};

/**
 * Down vote post
 */
export const downVotePost = (id: number) => {
  return request<Post>(`/posts/${id}/down`);
};

/*
 * Add a new comment to the post
 */
export const addComment = (postId: number, param: PostCommentRequest) => {
  return request<Comment>(
    `/posts/${postId}/comments`,
    requestOptions(param, 'POST'),
  );
};

/**
 * List comments related to the post.
 */
export const getPostComments = (param: GetPostCommentsParam, page = 0) => {
  return request<PagedResponse>(`/posts/${param.postId}/comments?page=${page}`);
};

/**
 * Get the comment with given id
 */
export const getComment = (commentId: number) => {
  return request<Comment>(`/posts/comments/${commentId}`);
};

/**
 * Delete the comment with given id
 */
export const deleteComemnt = (commentId: number) => {
  return request<StatusResponse>(
    `/posts/comments/${commentId}`,
    requestOptions({}, 'DELETE'),
  );
};
