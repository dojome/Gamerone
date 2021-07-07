import { User, LoginResponse, SignupResponse, Nullable } from 'interfaces';

import { LoginActionPayload, SignupActionPayload } from 'models/auth';
import { RootStateActions } from 'redux/types';
/**
 * App init
 */
export const INIT_AUTH = 'auth/INIT';

/**
 * Authorization
 */
export const CHECK_AUTHORIZATION = 'auth/CHECK_AUTHORIZATION';
export const CHECK_AUTHORIZATION_SUCCESS = 'auth/CHECK_AUTHORIZATION_SUCCESS';
export const CHECK_AUTHORIZATION_ERROR = 'auth/CHECK_AUTHORIZATION_ERROR';
export const GET_ME = 'auth/GET_ME';
export const GET_ME_SUCCESS = 'auth/GET_ME_SUCCESS';
export const GET_ME_ERROR = 'auth/GET_ME_ERROR';

/**
 * Log in
 */
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';

export const LOGOUT = 'auth/LOGOUT';

/**
 * Sign up
 */
export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';

/**
 * Current user
 */
export const UPDATE_CURRENT_USER = 'auth/UPDATE_CURRENT_USER';

/**
 *
 */

interface InitAuthAction {
  type: typeof INIT_AUTH;
}

interface GetMeAction {
  type: typeof GET_ME;
}

interface CheckAuthorizationAction {
  type: typeof CHECK_AUTHORIZATION;
}

interface CheckAuthorizationSuccessAction {
  type: typeof CHECK_AUTHORIZATION_SUCCESS;
  payload: LoginResponse;
}

export interface LoginAction {
  type: typeof LOGIN_REQUEST;
  payload: LoginActionPayload;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginResponse;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export interface SignupAction {
  type: typeof SIGNUP_REQUEST;
  payload: SignupActionPayload;
}

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  payload: SignupResponse;
}

interface UpdateCurrentUserAction {
  type: typeof UPDATE_CURRENT_USER;
  payload: User;
}

export interface AuthState {
  idToken: Nullable<string>;
  user: Nullable<User>;
}

export type AuthActionTypes =
  // inherited actions
  | RootStateActions
  // auth actions
  | InitAuthAction
  | GetMeAction
  | CheckAuthorizationAction
  | CheckAuthorizationSuccessAction
  | LoginAction
  | LoginSuccessAction
  | LogoutAction
  | SignupAction
  | SignupSuccessAction
  | UpdateCurrentUserAction;
