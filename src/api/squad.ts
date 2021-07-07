import request, { stringifyBody } from 'utils/request';
import {
  AddSquadRequest,
  SquadList,
  StatusResponse,
  SquadInviteList,
  SquadOutgoingList,
} from 'interfaces';

const requestOptions = (param: any, method = 'POST') => ({
  method,
  body: stringifyBody(param),
});

/**
 * Add a user to your squad list
 */
export const addToSquad = (param: AddSquadRequest) => {
  return request<SquadList>(`/squad`, requestOptions(param, 'PUT'));
};

/**
 * Delete a user from your squad
 */
export const deleteFromSquad = (userId: number) => {
  return request<StatusResponse>(`/squad/${userId}`, { method: 'DELETE' });
};

/**
 * Get squad list for a user
 */
export const getSquadList = (userId: number) => {
  return request<SquadList[]>(`/squad/${userId}`);
};

/**
 * Get waiting invite requests for you
 */
export const getWaitingInvites = () => {
  return request<SquadInviteList[]>(`/squad/invites`);
};

/**
 * Get your outgoing invite requests
 */
export const getOutgoingInvites = () => {
  return request<SquadOutgoingList[]>(`/squad/outgoing`);
};

/**
 * Accept a squad request from user
 */
export const acceptSquadRequest = (userId: number) => {
  return request<StatusResponse>(`/squad/accept/${userId}`);
};

/**
 * Decline a squad request from user
 */
export const declineSquadRequest = (userId: number) => {
  return request<StatusResponse>(`/squad/decline/${userId}`);
};
