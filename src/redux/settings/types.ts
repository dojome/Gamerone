import {
  ProfileSettingsRequest,
  SponsorRequest,
  ProductRequest,
  Nullable,
  Profile,
  User,
  UserExperienceAddRequest,
  UserExperience,
  Sponsor,
  Product,
  UserPrivacy,
  SocialNetwork,
  SocialNetworkRequest,
  PagedResponse,
  UserGame,
  UserGamePagedResponse,
  GameAddRequest,
  GameUpdateRequest,
  GamePlatform,
  NowPlaying,
  UserGearPagedResponse,
  UserGear,
  UserGearAddRequest,
  LayoutSettings,
  SquadInviteList,
  SquadOutgoingList,
} from 'interfaces';
import { UserPagedResponse } from 'interfaces/userPagedResponse';
import { NowPlayingRequest } from 'interfaces/nowPlayingRequest';
import {
  FollowSuccessAction,
  UnfollowSuccessAction,
  UpdateSquadAction,
} from 'redux/profile/types';
import { RootStateActions } from 'redux/types';
import { UserAttributes } from 'interfaces/userAttributes';
import { UserExperienceSummary } from 'interfaces/userExperienceSummary';

/**
 * Profile
 */
export const UPDATE_PROFILE_REQUEST = 'settings/UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'settings/UPDATE_PROFILE_SUCCESS';

export const LOAD_PROFILE_REQUEST = 'settings/LOAD_PROFILE_REQUEST';
export const LOAD_PROFILE_SUCCESS = 'settings/LOAD_PROFILE_SUCCESS';

/**
 * Avatar
 */
export const UPLOAD_AVATAR_REQUEST = 'settings/UPLOAD_AVATAR_REQUEST';
export const UPLOAD_AVATAR_SUCCESS = 'settings/UPLOAD_AVATAR_SUCCESS';

export const DELETE_AVATAR_REQUEST = 'settings/DELETE_AVATAR_REQUEST';

/**
 * BANNER
 */
export const UPLOAD_BANNER_REQUEST = 'settings/UPLOAD_BANNER_REQUEST';
export const DELETE_BANNER_REQUEST = 'settings/DELETE_BANNER_REQUEST';

/**
 * PRIVACY
 */

export const GET_PRIVACY_REQUEST = 'settings/GET_PRIVACY_REQUEST';
export const GET_PRIVACY_SUCCESS = 'settings/GET_PRIVACY_SUCCESS';

export const UPDATE_PRIVACY_REQUEST = 'settings/UPDATE_PRIVACY_REQUEST';
export const UPDATE_PRIVACY_SUCCESS = 'settings/UPDATE_PRIVACY_SUCCESS';

/**
 * Pagination
 */
export const LOAD_PAGE_REQUEST = 'settings/LOAD_PAGE_REQUEST';
export const LOAD_PAGE_SUCCESS = 'settings/LOAD_PAGE_SUCCESS';
export const LOAD_NEXT_PAGE = 'settings/LOAD_NEXT_PAGE';
export const LOAD_INITIAL_PAGE = 'settings/LOAD_INITIAL_PAGE';

/**
 * Pagination key
 */
export type PAGE_DATA = 'blocks' | 'games' | 'gears';

/**
 * Unblock
 */
export const REMOVE_BLOCKED = 'settings/REMOVE_BLOCKED';

/**
 * Experience
 */
export const UPDATE_EXPERIENCE_REQUEST = 'settings/UPDATE_EXPERIENCE_REQUEST';
export const UPDATE_EXPERIENCE_SUCCESS = 'settings/UPDATE_EXPERIENCE_SUCCESS';
export const UPDATE_EXPERIENCE_ERROR = 'settings/UPDATE_EXPERIENCE_ERROR';

export const DELETE_EXPERIENCE_REQUEST = 'settings/DELETE_EXPERIENCE_REQUEST';
export const DELETE_EXPERIENCES_SUCCESS = 'settings/DELETE_EXPERIENCES_SUCCESS';
export const DELETE_EXPERIENCES_ERROR = 'settings/DELETE_EXPERIENCES_ERROR';

export const GET_EXPERIENCES_REQUEST = 'settings/GET_EXPERIENCES_REQUEST';
export const GET_EXPERIENCES_SUCCESS = 'settings/GET_EXPERIENCES_SUCCESS';
export const GET_EXPERIENCES_ERROR = 'settings/GET_EXPERIENCES_ERROR';

export const CREATE_EXPERIENCE_REQUEST = 'settings/CREATE_EXPERIENCE_REQUEST';
export const CREATE_EXPERIENCE_SUCCESS = 'settings/CREATE_EXPERIENCE_SUCCESS';
export const CREATE_EXPERIENCE_ERROR = 'settings/CREATE_EXPERIENCE_ERROR';

export const UPDATE_EXPERIENCES = 'settings/UPDATE_EXPERIENCES';
export const GET_EXPERIENCES = 'settings/GET_EXPERIENCES';

/**
 * Sponsor
 */
export const ADD_SPONSOR_REQUEST = 'settings/ADD_SPONSOR_REQUEST';

export const UPDATE_SPONSOR_REQUEST = 'settings/UPDATE_SPONSOR_REQUEST';

export const DELETE_SPONSOR_REQUEST = 'settings/DELETE_SPONSOR_REQUEST';

export const UPDATE_SPONSORS = 'settings/UPDATE_SPONSORS';

/**
 * Products
 */
export const ADD_PRODUCT_REQUEST = 'settings/ADD_PRODUCT_REQUEST';

export const UPDATE_PRODUCT_REQUEST = 'settings/UPDATE_PRODUCT_REQUEST';

export const DELETE_PRODUCT_REQUEST = 'settings/DELETE_PRODUCT_REQUEST';

export const UPDATE_PRODUCTS = 'settings/UPDATE_PRODUCTS';

/**
 * Social Network
 */
export const ADD_UPDATE_SOCIAL_REQUEST = 'settings/ADD_UPDATE_SOCIAL_REQUEST';

export const DELETE_SOCIAL_REQUEST = 'settings/DELETE_SOCIAL_REQUEST';

export const UPDATE_SOCIAL_NETWORKS = 'settings/UPDATE_SOCIAL_NETWORKS';

/**
 * Games
 */
export const GET_GAME_PLATFORMS_REQUEST = 'settings/GET_GAME_PLATFORMS_REQUEST';
export const UPDATE_GAME_PLATFORMS = 'settings/UPDATE_GAME_PLATFORMS';

export const ADD_USER_GAME_REQUEST = 'settings/ADD_USER_GAME_REQUEST';
export const CREATE_USER_GAME_SUCCESS = 'settings/CREATE_USER_GAME_SUCCESS';

export const UPDATE_USER_GAME_REQUEST = 'settings/UPDATE_USER_GAME_REQUEST';
export const UPDATE_USER_GAME_SUCCESS = 'settings/UPDATE_USER_GAME_SUCCESS';

export const DELETE_USER_GAME_REQUEST = 'settings/DELETE_USER_GAME_REQUEST';
export const DELETE_USER_GAME_SUCCESS = 'settings/DELETE_USER_GAME_SUCCESS';

/**
 * Gears
 */
export const ADD_USER_GEAR_REQUEST = 'settings/ADD_USER_GEAR_REQUEST';
export const ADD_USER_GEAR_SUCCESS = 'settings/ADD_USER_GEAR_SUCCESS';

export const UPDATE_USER_GEAR_REQUEST = 'settings/UPDATE_USER_GEAR_REQUEST';
export const UPDATE_USER_GEAR_SUCCESS = 'settings/UPDATE_USER_GEAR_SUCCESS';

export const DELETE_USER_GEAR_REQUEST = 'settings/DELETE_USER_GEAR_REQUEST';
export const DELETE_USER_GEAR_SUCCESS = 'settings/DELETE_USER_GEAR_SUCCESS';

export const UPDATE_USER_GEARS = 'settings/UPDATE_USER_GEARS';

/**
 * Now playing on profile overview
 */
export const GET_NOW_PLAYING_GAME_REQUEST =
  'settings/GET_NOW_PLAYING_GAME_REQUEST';

export const UPDATE_NOW_PLAYING_GAME_REQUEST =
  'settings/UPDATE_NOW_PLAYING_GAME_REQUEST';

export const DELETE_NOW_PLAYING_GAME_REQUEST =
  'settings/DELETE_NOW_PLAYING_GAME_REQUEST';

export const GET_ONLINE_STATUS_REQUEST = 'settings/GET_ONLINE_STATUS_REQUEST';

export const NOW_PLAYING_GAME = 'settings/NOW_PLAYING_GAME';

/**
 * Profile overview layout settings
 */
export const UPDATE_LAYOUT_SETTINGS = 'settings/UPDATE_LAYOUT_SETTINGS';

/**
 * Squad
 */
export const GET_PENDING_SQUAD_REQUEST = 'settings/GET_PENDING_SQUAD_REQUEST';
export const GET_PENDING_SQUAD_SUCCESS = 'settings/GET_PENDING_SQUAD_SUCCESS';

export const GET_OUTGOING_SQUAD_REQUEST = 'settings/GET_OUTGOING_SQUAD_REQUEST';
export const GET_OUTGOING_SQUAD_SUCCESS = 'settings/GET_OUTGOING_SQUAD_SUCCESS';

export const UPDATE_PENDING_SQUAD = 'settings/UPDATE_PENDING_SQUAD';

export const ACCEPT_SQUAD_REQUEST = 'settings/ACCEPT_SQUAD_REQUEST';
export const ACCEPT_SQUAD_SUCCESS = 'settings/ACCEPT_SQUAD_SUCCESS';

export const DECLINE_SQUAD_REQUEST = 'settings/DECLINE_SQUAD_REQUEST';
export const DECLINE_SQUAD_SUCCESS = 'settings/DECLINE_SQUAD_SUCCESS';

export const DELETE_SQUAD_REQUEST = 'settings/DELETE_SQUAD_REQUEST';
export const DELETE_SQUAD_SUCCESS = 'settings/DELETE_SQUAD_SUCCESS';

/**
 * User Attributes
 */
export const GET_USER_ATTRIBUTES_REQUEST =
  'settings/GET_USER_ATTRIBUTES_REQUEST';
export const GET_USER_ATTRIBUTES_SUCCESS =
  'settings/GET_USER_ATTRIBUTES_SUCCESS';

export const UPDATE_USER_ATTRIBUTES_REQUEST =
  'settings/UPDATE_USER_ATTRIBUTES_REQUEST';
export const UPDATE_USER_ATTRIBUTES_SUCCESS =
  'settings/UPDATE_USER_ATTRIBUTES_SUCCESS';

export const DELETE_USER_ATTRIBUTES_REQUEST =
  'settings/DELETE_USER_ATTRIBUTES_REQUEST';
export const DELETE_USER_ATTRIBUTES_SUCCESS =
  'settings/DELETE_USER_ATTRIBUTES_SUCCESS';

export const UPDATE_EXPERIENCE_SUMMARY_REQUEST =
  'settings/UPDATE_EXPERIENCE_SUMMARY_REQUEST';

export const DELETE_EXPERIENCE_SUMMARY_REQUEST =
  'settings/DELETE_EXPERIENCE_SUMMARY_REQUEST';

/**
 * Actions
 */
export interface LoadProfileAction {
  type: typeof LOAD_PROFILE_REQUEST;
}

interface LoadProfileSuccessAction {
  type: typeof LOAD_PROFILE_SUCCESS;
  payload: Profile;
}

// Update Profile
export interface UpdateProfileAction {
  type: typeof UPDATE_PROFILE_REQUEST;
  payload: ProfileSettingsRequest;
}

export interface UpdateProfileSuccessAction {
  type: typeof UPDATE_PROFILE_SUCCESS;
  payload: User;
}

// Update Avatar, Banner
export interface UploadAvatarAction {
  type: typeof UPLOAD_AVATAR_REQUEST;
  payload: string;
}

export interface UploadBannerAction {
  type: typeof UPLOAD_BANNER_REQUEST;
  payload: string;
}

// Followers, Followings, Blocked pagination
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
  response: UserPagedResponse | UserGamePagedResponse | UserGearPagedResponse;
}

export interface LoadPageActionPayload {
  key: PAGE_DATA;
  page: number;
  dataApi: (id?: number, p?: number) => Promise<any>;
}

export interface RemoveBlockedAction {
  type: typeof REMOVE_BLOCKED;
  payload: number;
}

// Create a sponsor
export interface AddSponsorAction {
  type: typeof ADD_SPONSOR_REQUEST;
  payload: SponsorRequest;
}

// Update a sponsor
export interface UpdateSponsorActionPayload {
  id: number;
  data: SponsorRequest;
}

export interface UpdateSponsorAction {
  type: typeof UPDATE_SPONSOR_REQUEST;
  payload: UpdateSponsorActionPayload;
}

export interface UpdateSponsorsAction {
  type: typeof UPDATE_SPONSORS;
  payload: Sponsor[];
}

// Delete a sponsor
export interface DeleteSponsorAction {
  type: typeof DELETE_SPONSOR_REQUEST;
  payload: number;
}

/**
 * Product Actions
 */

// Create a product
export interface AddProductAction {
  type: typeof ADD_PRODUCT_REQUEST;
  payload: ProductRequest;
}

// Update a product
export interface UpdateProductActionPayload {
  id: number;
  data: ProductRequest;
}

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT_REQUEST;
  payload: UpdateProductActionPayload;
}

// Delete a product
export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT_REQUEST;
  payload: number;
}

/**
 * Social Network Actions
 */

// Update socials
export interface AddUpdateSocialAction {
  type: typeof ADD_UPDATE_SOCIAL_REQUEST;
  payload: SocialNetworkRequest;
}

// Delete a social
export interface DeleteSocialAction {
  type: typeof DELETE_SOCIAL_REQUEST;
  payload: number;
}

// Get socials
export interface GetPrivacyAction {
  type: typeof GET_PRIVACY_REQUEST;
}

export interface GetPrivacySuccessAction {
  type: typeof GET_PRIVACY_SUCCESS;
  payload: UserPrivacy;
}

export interface UpdatePrivacyAction {
  type: typeof UPDATE_PRIVACY_REQUEST;
  payload: UserPrivacy;
}

export interface UpdatePrivacySuccessAction {
  type: typeof UPDATE_PRIVACY_SUCCESS;
  payload: UserPrivacy;
}

// Delete Experience
export interface DeleteExperienceAction {
  type: typeof DELETE_EXPERIENCE_REQUEST;
  payload: number;
}

// Update Experience
export interface UpdateExperienceAction {
  type: typeof UPDATE_EXPERIENCE_REQUEST;
  payload: UpdateExperienceActionPayload;
}

export interface UpdateExperiencesAction {
  type: typeof UPDATE_EXPERIENCES;
  payload: UserExperience[];
}

// Get experiences
export interface GetExperiencesAction {
  type: typeof GET_EXPERIENCES_REQUEST;
}

export interface GetExperiencesSuccessAction {
  type: typeof GET_EXPERIENCES_SUCCESS;
  payload: UserExperience[];
}

// Create an experience
export interface CreateExperienceAction {
  type: typeof CREATE_EXPERIENCE_REQUEST;
  payload: UserExperienceAddRequest;
}

// Update n experience
export interface UpdateExperienceActionPayload {
  id: number;
  data: UserExperienceAddRequest;
}

export interface UpdateProductsAction {
  type: typeof UPDATE_PRODUCTS;
  payload: Product[];
}

export interface UpdateSocialNetworksAction {
  type: typeof UPDATE_SOCIAL_NETWORKS;
  payload: SocialNetwork[];
}

/**
 * Games
 */

// get game platforms
export interface GetGamePlatformsAction {
  type: typeof GET_GAME_PLATFORMS_REQUEST;
}

export interface UpdateGamePlatformsAction {
  type: typeof UPDATE_GAME_PLATFORMS;
  payload: GamePlatform[];
}

// create a usergame
export interface AddUserGameAction {
  type: typeof ADD_USER_GAME_REQUEST;
  payload: GameAddRequest;
}

export interface CreateUserGameSuccessAction {
  type: typeof CREATE_USER_GAME_SUCCESS;
  payload: UserGame;
}

// update a usergame
export interface UpdateUserGameActionPayload {
  id: number;
  data: GameUpdateRequest;
}

export interface UpdateUserGameAction {
  type: typeof UPDATE_USER_GAME_REQUEST;
  payload: UpdateUserGameActionPayload;
}

export interface UpdateUserGameSuccessAction {
  type: typeof UPDATE_USER_GAME_SUCCESS;
  payload: UserGame;
}

// delete a usergame
export interface DeleteUserGameAction {
  type: typeof DELETE_USER_GAME_REQUEST;
  payload: number;
}

export interface DeleteUserGameSuccessAction {
  type: typeof DELETE_USER_GAME_SUCCESS;
  payload: number;
}

/**
 * Gears
 */
export interface AddUserGearAction {
  type: typeof ADD_USER_GEAR_REQUEST;
  payload: UserGearAddRequest;
}

export interface AddUserGearSuccessAction {
  type: typeof ADD_USER_GEAR_SUCCESS;
  payload: UserGear;
}

export interface UpdateUserGearAction {
  type: typeof UPDATE_USER_GEAR_REQUEST;
  payload: UpdateUserGearActionPayload;
}

export interface UpdateUserGearActionPayload {
  id: number;
  data: UserGearAddRequest;
}

export interface UpdateUserGearSuccessAction {
  type: typeof UPDATE_USER_GEAR_SUCCESS;
  payload: UserGear;
}

export interface DeleteUserGearAction {
  type: typeof DELETE_USER_GEAR_REQUEST;
  payload: number;
}

export interface DeleteUserGearSuccessAction {
  type: typeof DELETE_USER_GEAR_SUCCESS;
  payload: number;
}

export interface UpdateUserGearsAction {
  type: typeof UPDATE_USER_GEARS;
  payload: UserGear[];
}

/**
 * Now playing game actions
 */

// get request
export interface GetNowPlayingGameAction {
  type: typeof GET_NOW_PLAYING_GAME_REQUEST;
}

// update request
export interface UpdateNowPlayingGameAction {
  type: typeof UPDATE_NOW_PLAYING_GAME_REQUEST;
  payload: NowPlayingRequest;
}

// delete request
export interface DeleteNowPlayingGameAction {
  type: typeof DELETE_NOW_PLAYING_GAME_REQUEST;
}

// online status
export interface GetOnlineStatusAction {
  type: typeof GET_ONLINE_STATUS_REQUEST;
}

// update now playing game
export interface NowPlayingGameAction {
  type: typeof NOW_PLAYING_GAME;
  payload: NowPlaying;
}

export interface UpdateLayoutSettingsAction {
  type: typeof UPDATE_LAYOUT_SETTINGS;
  payload: LayoutSettings;
}

// Squad
export interface GetPendingSquadAction {
  type: typeof GET_PENDING_SQUAD_REQUEST;
}

export interface GetPendingSquadSuccessAction {
  type: typeof GET_PENDING_SQUAD_SUCCESS;
  payload: SquadInviteList[];
}

export interface GetOutgoingSquadAction {
  type: typeof GET_OUTGOING_SQUAD_REQUEST;
}

export interface GetOutgoingSquadSuccessAction {
  type: typeof GET_OUTGOING_SQUAD_SUCCESS;
  payload: SquadOutgoingList[];
}

export interface UpdatePendingSquadAction {
  type: typeof UPDATE_PENDING_SQUAD;
  payload: SquadInviteList[];
}

export interface AcceptSquadAction {
  type: typeof ACCEPT_SQUAD_REQUEST;
  payload: number;
}

export interface AcceptSquadSuccessAction {
  type: typeof ACCEPT_SQUAD_SUCCESS;
  payload: number;
}

export interface DeclineSquadAction {
  type: typeof DECLINE_SQUAD_REQUEST;
  payload: number;
}

export interface DeclineSquadSuccessAction {
  type: typeof DECLINE_SQUAD_SUCCESS;
  payload: number;
}

export interface DeleteSquadAction {
  type: typeof DELETE_SQUAD_REQUEST;
  payload: number;
}

// User Attributes
export interface GetUserAttributesAction {
  type: typeof GET_USER_ATTRIBUTES_REQUEST;
}

export interface GetUserAttributesSuccessAction {
  type: typeof GET_USER_ATTRIBUTES_SUCCESS;
  payload: UserAttributes;
}

export interface UpdateUserAttributesAction {
  type: typeof UPDATE_USER_ATTRIBUTES_REQUEST;
  payload: UserAttributes;
}

export interface UpdateUserAttributesSuccessAction {
  type: typeof UPDATE_USER_ATTRIBUTES_SUCCESS;
  payload: UserAttributes;
}

export interface DeleteUserAttributesSuccessAction {
  type: typeof DELETE_USER_ATTRIBUTES_SUCCESS;
  payload: UserAttributes;
}

export interface UpdateExperienceSummaryAction {
  type: typeof UPDATE_EXPERIENCE_SUMMARY_REQUEST;
  payload: {
    updatedExperienceSummary: UserExperienceSummary;
    currentUserAttributes: UserAttributes;
  };
}

export interface DeleteExperienceSummaryAction {
  type: typeof DELETE_EXPERIENCE_SUMMARY_REQUEST;
  payload: UserAttributes;
}

// State
export interface SettingsState {
  /* Sessioned user's profile */
  profile: Profile;

  /* User privacy */
  privacy: UserPrivacy;

  /* Followers, Followings, Blocks, Games data */
  pageData: {
    [key in PAGE_DATA]: Array<User | UserGame | UserGear>;
  };

  /* Dictionary of page responses */
  pageResponse: {
    [key in PAGE_DATA]: Nullable<PagedResponse>;
  };

  /* Experiences */
  experiences: UserExperience[];

  gamePlatforms: GamePlatform[];

  squadPendingList: SquadInviteList[];
  squadOutgoingList: SquadOutgoingList[];

  userAttributes: UserAttributes;
}

export type SettingsActionTypes =
  // inherited actions
  | RootStateActions
  // settings actions
  | LoadProfileAction
  | LoadProfileSuccessAction
  | UpdateProfileAction
  | UpdateProfileSuccessAction
  | UploadAvatarAction
  | UploadBannerAction
  | LoadPageAction
  | LoadNextPageAction
  | LoadInitialPageAction
  | LoadPageSuccessAction
  | RemoveBlockedAction
  | UpdateExperienceAction
  | DeleteExperienceAction
  | GetExperiencesAction
  | GetExperiencesSuccessAction
  | CreateExperienceAction
  | AddSponsorAction
  | UpdateExperiencesAction
  | UpdateSponsorAction
  | DeleteSponsorAction
  | AddProductAction
  | UpdateProductAction
  | DeleteProductAction
  | AddUpdateSocialAction
  | DeleteSocialAction
  | GetPrivacyAction
  | GetPrivacySuccessAction
  | UpdatePrivacyAction
  | UpdatePrivacySuccessAction
  | UpdateSponsorsAction
  | UpdateProductsAction
  | UpdateSocialNetworksAction
  | AddUserGameAction
  | UpdateUserGameAction
  | DeleteUserGameAction
  | CreateUserGameSuccessAction
  | UpdateUserGameSuccessAction
  | DeleteUserGameSuccessAction
  | UpdateUserGearAction
  | UpdateUserGearSuccessAction
  | AddUserGearAction
  | AddUserGearSuccessAction
  | DeleteUserGearAction
  | DeleteUserGearSuccessAction
  | UpdateUserGearsAction
  | GetGamePlatformsAction
  | UpdateGamePlatformsAction
  | GetNowPlayingGameAction
  | UpdateNowPlayingGameAction
  | DeleteNowPlayingGameAction
  | GetOnlineStatusAction
  | NowPlayingGameAction
  // bind to profile actions
  | FollowSuccessAction
  | UnfollowSuccessAction
  | UpdateLayoutSettingsAction
  | GetPendingSquadAction
  | GetOutgoingSquadAction
  | UpdateSquadAction
  | GetPendingSquadSuccessAction
  | GetOutgoingSquadSuccessAction
  | AcceptSquadAction
  | AcceptSquadSuccessAction
  | DeclineSquadAction
  | DeclineSquadSuccessAction
  | DeleteSquadAction
  // User Attributes
  | GetUserAttributesAction
  | GetUserAttributesSuccessAction
  | UpdateUserAttributesAction
  | UpdateUserAttributesSuccessAction
  | DeleteUserAttributesSuccessAction
  // User Attribute: Exeperience Summary
  | UpdateExperienceSummaryAction
  | DeleteExperienceSummaryAction;
