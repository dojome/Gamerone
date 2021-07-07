import request, { stringifyBody } from 'utils/request';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  CheckEmailRequest,
  CheckUsernameRequest,
  VerifyTokenRequest,
  StatusResponse,
  User,
} from 'interfaces';

const requestOptions = (param: any): RequestInit => ({
  method: 'POST',
  body: stringifyBody(param),
});

/**
 * Sign up as a new user
 */
export const signUp = (param: SignupRequest) => {
  return request<LoginResponse>('/signup', requestOptions(param));
};

/**
 * Check for unique email address
 */
export const checkEmail = (param: string) => {
  return request<StatusResponse>(
    '/check-email',
    requestOptions({ email: param } as CheckEmailRequest),
  );
};

/**
 * Check for unique username
 */
export const checkUsername = (param: string) => {
  return request<StatusResponse>(
    '/check-username',
    requestOptions({ username: param } as CheckUsernameRequest),
  );
};

/**
 * Log in with an existing user
 */
export const login = (param: LoginRequest) => {
  return request<LoginResponse>('/login', requestOptions(param));
};

/**
 * Verify email with token
 */
export const verifyEmail = (param: VerifyTokenRequest) => {
  return request<StatusResponse>('/verify-token', requestOptions(param));
};

/**
 * Get user information for authenticated user
 */
export const getMe = () => {
  return request<User>('/me');
};
