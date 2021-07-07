import produce from 'immer';
import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGOUT,
  CHECK_AUTHORIZATION_SUCCESS,
  UPDATE_CURRENT_USER,
  AuthActionTypes,
  AuthState,
} from './types';
import { getToken } from 'utils/token';
import { UserModel } from 'models/user';
import { INIT_STATE } from 'redux/types';

// TODO: Verify initial token
export const initState: AuthState = {
  idToken: getToken().get('idToken'),
  user: null,
};

export default function authReducer(
  state = initState,
  action: AuthActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        draft.idToken = null;
        draft.user = null;
        break;
      case SIGNUP_SUCCESS:
      case LOGIN_SUCCESS: {
        const { token, user } = action.payload;
        draft.idToken = token || null;
        draft.user = new UserModel().fromDto(user);
        break;
      }

      case LOGOUT:
        draft.idToken = null;
        break;

      case CHECK_AUTHORIZATION_SUCCESS: {
        const { token, user } = action.payload;

        draft.idToken = token || null;
        draft.user = new UserModel().fromDto(user);
        break;
      }

      case UPDATE_CURRENT_USER:
        draft.user = new UserModel().fromDto(action.payload);
        break;

      default:
    }
  });
}
