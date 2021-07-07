import { RouterState } from 'connected-react-router';
import { AuthState } from './auth/types';
import { ProfileState } from './profile/types';
import { SettingsState } from './settings/types';
import { PostState } from './post/types';
import { PostFormState } from './post-form/types';
import { DialogState } from './dialogs/types';
import { RequestStatusState } from './request-status/types';
import { MiscState } from './misc/types';

export const INIT_STATE = 'root/INIT_STATE';
export const LOAD_STATE = 'root/LOAD_STATE';

export const LOAD_INITIAL_GAMES = 'root/LOAD_INITIAL_GAMES';
export const LOAD_NEXT_GAMES = 'root/LOAD_GAMES';

export const LOAD_EXPERIENCES = 'root/LOAD_EXPERIENCES';
export const LOAD_EXPERIENCE_SUMMARY = 'root/LOAD_EXPERIENCE_SUMMARY';

export interface InitStateAction {
  type: typeof INIT_STATE;
}

export type RootStateActions = InitStateAction;

export interface RootState {
  Auth: AuthState;
  Profile: ProfileState;
  Settings: SettingsState;
  Post: PostState;
  PostForm: PostFormState;
  Dialog: DialogState;
  RequestStatus: RequestStatusState;
  router: RouterState;
  Misc: MiscState;
}
