import request, { stringifyBody } from 'utils/request';
import { User } from 'interfaces';
import { PagedResponse } from 'interfaces/pagedResponse';
import { MultiFollowRequest } from 'interfaces';

const OPTIONS = {
  method: 'GET',
};

const requestOptions = (param: any): RequestInit => ({
  method: 'POST',
  body: stringifyBody(param),
});

/**
 * Convenience function for friends.
 * Note: Can only be accessed if authenticated.
 * @param {*} path
 */
const friends = (path: string, options: any = OPTIONS) => {
  return request(path, options);
};

/**
 * Follow a user/club
 */
export const follow = (id: number) => {
  return request<User>('/follow/' + id);
};

/**
 * Follow multiple users
 */
export const multiFollow = (param: MultiFollowRequest) => {
  return friends('/follow/', requestOptions(param));
};

/**
 * Unfollow a user/club
 */
export const unfollow = (id: number) => {
  return request<User>('/unfollow/' + id);
};

/**
 * List following users
 */
export const following = (userId: number, page = 0) => {
  return request<PagedResponse>(`/following/${userId}?page=${page}`, OPTIONS);
};

/**
 * List followers
 */
export const followers = (userId: number, page = 0) => {
  return request<PagedResponse>(`/followers/${userId}?page=${page}`, OPTIONS);
};

/**
 * List users that given user is following.
 */
export const followingById = (id: number) => {
  return request<PagedResponse>('/following/' + id, OPTIONS);
};

/**
 * List followers
 */
export const followersById = (id: number) => {
  return request<PagedResponse>('/followers/' + id, OPTIONS);
};

/**
 * Block a user/club
 */
export const block = (id: number) => {
  return request<User>('/block/' + id);
};

/**
 * Unblock a user/club
 */
export const unblock = (id: number) => {
  return request<User>('/unblock/' + id);
};

/**
 * List blocked users
 */
export const blocks = (page = 0) => {
  return request<PagedResponse>(`/blocks?page=${page}`, OPTIONS);
};
