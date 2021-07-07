import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';
import { UserModel } from 'models/user';

export const selectGlobal = (state: RootState) => state.Auth || initState;

/**
 * Note: This selector shouldn't be used in UI related stuff. if need to manage UI, consider using selectSettingsProfileUser from Settings state
 */
export const selectCurrentUser = createSelector(
  selectGlobal,
  (state) => state.user || new UserModel(),
);

export const selectIsAuthenticated = createSelector(
  selectGlobal,
  (state) => state.idToken !== null,
);

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (user) => user.id,
);

export const selectCurrentUsername = createSelector(
  selectCurrentUser,
  (user) => user.username,
);

export const selectCurrentUserAvatar = createSelector(
  selectCurrentUser,
  (user) => user.avatar,
);
