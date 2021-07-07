import request, { stringifyBody } from 'utils/request';
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
  StatusResponse,
} from 'interfaces';

const requestOptions = (param: any, method = 'POST'): RequestInit => ({
  method,
  body: stringifyBody(param),
});

/**
 * Receive an email with a link to reset your password.
 */
export const forgotPassword = (param: ForgotPasswordRequest) => {
  return request<StatusResponse>('/forgot-password', requestOptions(param));
};

/**
 * Updates your password. Sends email notification.
 */
export const resetPassword = (param: ResetPasswordRequest) => {
  return request<StatusResponse>('/reset-password', requestOptions(param));
};
