import {
  Route,
  Profile,
  Nullable,
  MultiFollowRequest,
  LayoutSettings,
  UserGame,
  PagedResponse,
  UserGamePagedResponse,
  UserGear,
  SquadList,
  User,
  UserGearPagedResponse,
  UserPagedResponse,
  UserExperience,
} from 'interfaces';
import { ProfileModel } from 'models/profile';
import { RootStateActions } from 'redux/types';
import { UserExperienceSummary } from 'interfaces/userExperienceSummary';

/**
 * Profile
 */
export const GET_PROFILE_REQUEST = 'profile/GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'profile/GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'profile/GET_PROFILE_ERROR';

export const SET_CURRENT_PROFILE = 'profile/SET_CURRENT_PROFILE';

/**
 * Profile Layout
 */
export const GET_PROFILE_LAYOUT_REQUEST = 'profile/GET_PROFILE_LAYOUT_REQUEST';
export const GET_PROFILE_LAYOUT_SUCCESS = 'profile/GET_PROFILE_LAYOUT_SUCCESS';
export const GET_PROFILE_LAYOUT_ERROR = 'profile/GET_PROFILE_LAYOUT_ERROR';

export const SET_CURRENT_PROFILE_LAYOUT_REQUEST =
  'profile/SET_CURRENT_PROFILE_LAYOUT_REQUEST';
export const SET_CURRENT_PROFILE_LAYOUT_SUCCESS =
  'profile/SET_CURRENT_PROFILE_LAYOUT_SUCCESS';
export const SET_CURRENT_PROFILE_LAYOUT_ERROR =
  'profile/SET_CURRENT_PROFILE_LAYOUT_ERROR';

export const PROFILE_LAYOUT_PROCESS = 'profile/PROFILE_LAYOUT_PROCESS';
export const PROFILE_LAYOUT_TEMP = 'profile/PROFILE_LAYOUT_TEMP';

export type ProfileLayoutProcessType =
  | 'isEdit'
  | 'save'
  | 'default'
  | 'cancel'
  | 'initial';

export enum ProfileLayoutProcessTypeEnum {
  Initial = 'initial',
  IsEdit = 'isEdit',
  Save = 'save',
  Default = 'default',
  Cancel = 'cancel',
}

/**
 * Resolve route
 */
export const RESOLVE_NAME_REQUEST = 'profile/RESOLVE_NAME_REQUEST';
export const RESOLVE_NAME_SUCCESS = 'profile/RESOLVE_NAME_SUCCESS';
export const RESOLVE_NAME_ERROR = 'profile/RESOLVE_NAME_ERROR';

export const SET_RESOLVED_CONTENT = 'profile/SET_RESOLVED_CONTENT';

/**
 * Pagination for games, gears, followers, followings
 */
export const LOAD_PAGE_REQUEST = 'profile/LOAD_PAGE_REQUEST';
export const LOAD_PAGE_SUCCESS = 'profile/LOAD_PAGE_SUCCESS';
export const LOAD_NEXT_PAGE = 'profile/LOAD_NEXT_PAGE';
export const LOAD_INITIAL_PAGE = 'profile/LOAD_INITIAL_PAGE';

export type PAGE_DATA = 'games' | 'gears' | 'followers' | 'followings';

/**
 * Follow actions
 */
export const FOLLOW_REQUEST = 'profile/FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'profile/FOLLOW_SUCCESS';

export const UNFOLLOW_REQUEST = 'profile/UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'profile/UNFOLLOW_SUCCESS';

export const BLOCK_REQUEST = 'profile/BLOCK_REQUEST';
export const BLOCK_SUCCESS = 'profile/BLOCK_SUCCESS';

export const UNBLOCK_REQUEST = 'profile/UNBLOCK_REQUEST';
export const UNBLOCK_SUCCESS = 'profile/UNBLOCK_SUCCESS';

export const MULTI_FOLLOW_REQUEST = 'profile/MULTI_FOLLOW_REQUEST';
export const MULTI_FOLLOW_SUCCESS = 'profile/MULTI_FOLLOW_SUCCESS';

// Direct state update
export const REMOVE_FOLLOWING = 'profile/REMOVE_FOLLOWING';
export const REMOVE_FOLLOWER = 'profile/REMOVE_FOLLOWER';

// Direct state update
export const ADD_FOLLOWING = 'profile/ADD_FOLLOWING';
export const ADD_FOLLOWER = 'profile/ADD_FOLLOWER';

/**
 * Squad
 */
export const GET_SQUAD_REQUEST = 'profile/GET_SQUAD_REQUEST';
export const GET_SQUAD_SUCCESS = 'profile/GET_SQUAD_SUCCESS';
export const UPDATE_SQUAD = 'profile/UPDATE_SQUAD';

export const ADD_SQUAD_REQUEST = 'profile/ADD_SQUAD_REQUEST';
export const ADD_SQUAD_SUCCESS = 'profile/ADD_SQUAD_SUCCESS';

/**
 * Experiences
 */
export const GET_EXPERIENCES_REQUEST = 'profile/GET_EXPERIENCES_REQUEST';
export const GET_EXPERIENCES_SUCCESS = 'profile/GET_EXPERIENCES_SUCCESS';

export const GET_EXPERIENCE_SUMMARY_REQUEST =
  'profile/GET_EXPERIENCE_SUMMARY_REQUEST';
export const GET_EXPERIENCE_SUMMARY_SUCCESS =
  'profile/GET_EXPERIENCE_SUMMARY_SUCCESS';

interface ResolveNameAction {
  type: typeof RESOLVE_NAME_REQUEST;
}

interface ResolveNameSuccessAction {
  type: typeof RESOLVE_NAME_SUCCESS;
}

interface ResolveNameErrorAction {
  type: typeof RESOLVE_NAME_ERROR;
}

export interface MultiFollowAction {
  type: typeof MULTI_FOLLOW_REQUEST;
  payload: MultiFollowRequest;
}

export interface FollowAction {
  type: typeof FOLLOW_REQUEST;
  payload?: number;
}

export interface FollowSuccessAction {
  type: typeof FOLLOW_SUCCESS;
  payload: number;
}

export interface BlockAction {
  type: typeof BLOCK_REQUEST;
  payload?: number;
}

export interface UnfollowAction {
  type: typeof UNFOLLOW_REQUEST;
  payload?: number;
}

export interface UnfollowSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  payload: number;
}

export interface UnblockAction {
  type: typeof UNBLOCK_REQUEST;
  payload?: number;
}

export interface UnblockSuccessAction {
  type: typeof UNBLOCK_SUCCESS;
  payload: number;
}

export interface AddFollowingAction {
  type: typeof ADD_FOLLOWING;
  payload: User;
}

export interface AddFollowerAction {
  type: typeof ADD_FOLLOWER;
  payload: User;
}

export interface RemoveFollowingAction {
  type: typeof REMOVE_FOLLOWING;
  payload: number;
}

export interface RemoveFollowerAction {
  type: typeof REMOVE_FOLLOWER;
  payload: number;
}

export interface GetProfileAction {
  type: typeof GET_PROFILE_REQUEST;
  payload: number;
}

interface GetProfileSuccessAction {
  type: typeof GET_PROFILE_SUCCESS;
  payload: Profile;
}

interface GetProfileErrorAction {
  type: typeof GET_PROFILE_ERROR;
  payload: Error;
}

interface SetCurrentProfileAction {
  type: typeof SET_CURRENT_PROFILE;
  payload: Nullable<Profile>;
}

/**
 * Profile Layout Actions
 */

export interface GetProfileLayoutAction {
  type: typeof GET_PROFILE_LAYOUT_REQUEST;
}

export interface GetProfileLayoutSuccessAction {
  type: typeof GET_PROFILE_LAYOUT_SUCCESS;
  payload: LayoutSettings;
}

export interface GetProfileLayoutErrorAction {
  type: typeof GET_PROFILE_LAYOUT_ERROR;
  payload: Error;
}

export interface SetCurrentProfileLayoutAction {
  type: typeof SET_CURRENT_PROFILE_LAYOUT_REQUEST;
  payload: LayoutSettings;
}

export interface ProfileLayoutProcessAction {
  type: typeof PROFILE_LAYOUT_PROCESS;
  payload: ProfileLayoutProcessTypeEnum;
}

export interface ProfileLayoutTempAction {
  type: typeof PROFILE_LAYOUT_TEMP;
  payload: LayoutSettings;
}

export interface SetResolvedContentAction {
  type: typeof SET_RESOLVED_CONTENT;
  payload: Route;
}

// Pagination
export interface LoadPageAction {
  type: typeof LOAD_PAGE_REQUEST;
  payload: LoadPageActionPayload;
}

export interface LoadNextPageAction {
  type: typeof LOAD_NEXT_PAGE;
  payload: PAGE_DATA;
}

export interface LoadInitialPageAction {
  type: typeof LOAD_INITIAL_PAGE;
  payload: PAGE_DATA;
}

export interface LoadPageSuccessAction {
  type: typeof LOAD_PAGE_SUCCESS;
  payload: LoadPageSuccessActionPayload;
}

export interface LoadPageSuccessActionPayload {
  key: PAGE_DATA;
  response: UserGamePagedResponse | UserGearPagedResponse | UserPagedResponse;
}

export interface LoadPageActionPayload {
  key: PAGE_DATA;
  page: number;
  dataApi: (id?: number, p?: number) => Promise<any>;
}

/**
 * Squad
 */
export interface GetSquadAction {
  type: typeof GET_SQUAD_REQUEST;
  payload?: number;
}

export interface GetSquadSuccessAction {
  type: typeof GET_SQUAD_SUCCESS;
  payload: SquadList[];
}

export interface UpdateSquadAction {
  type: typeof UPDATE_SQUAD;
  payload: SquadList[];
}

export interface AddSquadAction {
  type: typeof ADD_SQUAD_REQUEST;
  payload?: number;
}

export interface AddSquadSuccessAction {
  type: typeof ADD_SQUAD_SUCCESS;
}

/**
 * Experience
 */
export interface GetExperiencesAction {
  type: typeof GET_EXPERIENCES_REQUEST;
  payload?: number;
}

export interface GetExperiencesSuccessAction {
  type: typeof GET_EXPERIENCES_SUCCESS;
  payload: UserExperience[];
}

export interface GetExperienceSummaryAction {
  type: typeof GET_EXPERIENCE_SUMMARY_REQUEST;
  payload?: number;
}

export interface GetExperienceSummarySuccessAction {
  type: typeof GET_EXPERIENCE_SUMMARY_SUCCESS;
  payload: UserExperienceSummary;
}

export interface ProfileState {
  /* A list of cached profiles */
  profiles: ProfileModel[];

  /* Currently showing profile */
  profile: Nullable<ProfileModel>;

  /* Currently resolved route content */
  resolvedContent: Nullable<Route>;

  /* Profile layout */
  layout: LayoutSettings;

  layoutProcess: ProfileLayoutProcessTypeEnum;

  pageData: {
    // [key in PAGE_DATA]: Array<User | UserGame | UserGear>;
    games: Array<UserGame>;
    gears: Array<UserGear>;
    followers: Array<User>;
    followings: Array<User>;
  };

  pageResponse: {
    [key in PAGE_DATA]: Nullable<PagedResponse>;
  };

  squad: SquadList[];

  experienceSummary: UserExperienceSummary | null;
  experiences: UserExperience[];
}

export type ProfileActionTypes =
  // inherited actions
  | RootStateActions
  // profile actions
  | SetCurrentProfileAction
  | GetProfileAction
  | GetProfileSuccessAction
  | GetProfileErrorAction
  | SetCurrentProfileLayoutAction
  | GetProfileLayoutAction
  | GetProfileLayoutSuccessAction
  | GetProfileLayoutErrorAction
  | FollowAction
  | MultiFollowAction
  | FollowSuccessAction
  | UnfollowAction
  | UnfollowSuccessAction
  | BlockAction
  | UnblockAction
  | UnblockSuccessAction
  | AddFollowerAction
  | AddFollowingAction
  | RemoveFollowerAction
  | RemoveFollowingAction
  | ResolveNameAction
  | ResolveNameSuccessAction
  | ResolveNameErrorAction
  | SetResolvedContentAction
  | ProfileLayoutProcessAction
  | LoadInitialPageAction
  | LoadPageSuccessAction
  | LoadNextPageAction
  | ProfileLayoutTempAction
  // Squad
  | GetSquadAction
  | GetSquadSuccessAction
  | UpdateSquadAction
  | AddSquadAction
  | AddSquadSuccessAction
  // Experience
  | GetExperiencesAction
  | GetExperiencesSuccessAction
  | GetExperienceSummaryAction
  | GetExperienceSummarySuccessAction;
