import request from 'utils/request';
import { PagedPost } from 'interfaces';

/**
 * Load game's feed posts
 */
export const getGameFeed = (gameId: number, start?: number) => {
  let url = `/feed/game/${gameId}`;
  if (start) url += `?start=${start}`;
  return request<PagedPost[]>(url);
};

/**
 * Load user's feed posts
 */
export const getUserFeed = (userId: number, start?: number) => {
  let url = `/feed/user/${userId}`;
  if (start) url += `?start=${start}`;
  return request<PagedPost[]>(url);
};

/**
 * Load user's feed posts
 */
export const getClubFeed = (clubId: number, start?: number) => {
  let url = `/feed/club/${clubId}`;
  if (start) url += `?start=${start}`;
  return request<PagedPost[]>(url);
};

/**
 * Load home feed
 */
export const getHomeFeed = (_: number, start?: number) => {
  let url = '/feed';
  if (start) url += `?start=${start}`;
  return request<PagedPost[]>(url);
};

/**
 * Load private feed
 */
export const getPrivateFeed = (_: number, start?: number) => {
  let url = '/feed/private';
  if (start) url += `?start=${start}`;
  return request<PagedPost[]>(url);
};

/**
 * Load private feed
 */
export const getPromotedFeed = (_: number, start?: number) => {
  let url = '/feed/promoted';
  if (start) url += `?start=${start}`;
  return request<PagedPost[]>(url);
};
