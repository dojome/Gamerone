import {
  INIT_AUTH,
  CHECK_AUTHORIZATION,
  LOGIN_REQUEST,
  SIGNUP_SUCCESS,
  LOGOUT,
  SIGNUP_REQUEST,
  UPDATE_CURRENT_USER,
  GET_ME,
  AuthActionTypes,
} from './types';

import { User, SignupResponse } from 'interfaces';
import { LoginActionPayload, SignupActionPayload } from 'models/auth';

export default {
  initAuth: (): AuthActionTypes => ({ type: INIT_AUTH }),
  getMe: (): AuthActionTypes => ({ type: GET_ME }),

  checkAuthorization: (): AuthActionTypes => ({
    type: CHECK_AUTHORIZATION,
  }),
  login: (payload: LoginActionPayload): AuthActionTypes => ({
    type: LOGIN_REQUEST,
    payload,
  }),
  logout: (): AuthActionTypes => ({
    type: LOGOUT,
  }),

  signUp: (payload: SignupActionPayload): AuthActionTypes => ({
    type: SIGNUP_REQUEST,
    payload,
  }),
  signUpSuccess: (payload: SignupResponse): AuthActionTypes => ({
    type: SIGNUP_SUCCESS,
    payload,
  }),

  updateCurrentUser: (payload: User): AuthActionTypes => ({
    type: UPDATE_CURRENT_USER,
    payload,
  }),
};
