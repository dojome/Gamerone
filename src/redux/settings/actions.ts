import {
  CREATE_EXPERIENCE_REQUEST,
  ADD_SPONSOR_REQUEST,
  CreateExperienceAction,
  AddSponsorAction,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_SPONSOR_REQUEST,
  DeleteExperienceAction,
  GET_EXPERIENCES_REQUEST,
  GET_PRIVACY_REQUEST,
  GetExperiencesAction,
  GetPrivacyAction,
  LOAD_INITIAL_PAGE,
  LOAD_NEXT_PAGE,
  LOAD_PAGE_REQUEST,
  UPDATE_SPONSOR_REQUEST,
  ADD_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  UPDATE_PRIVACY_REQUEST,
  LOAD_PROFILE_REQUEST,
  ADD_UPDATE_SOCIAL_REQUEST,
  DELETE_SOCIAL_REQUEST,
  ADD_USER_GAME_REQUEST,
  DELETE_USER_GAME_REQUEST,
  UPDATE_USER_GAME_REQUEST,
  GET_GAME_PLATFORMS_REQUEST,
  UPDATE_GAME_PLATFORMS,
  UPDATE_PROFILE_SUCCESS,
  GET_NOW_PLAYING_GAME_REQUEST,
  DELETE_NOW_PLAYING_GAME_REQUEST,
  UPDATE_NOW_PLAYING_GAME_REQUEST,
  GET_ONLINE_STATUS_REQUEST,
  UPDATE_USER_GEAR_REQUEST,
  DELETE_USER_GEAR_REQUEST,
  DELETE_BANNER_REQUEST,
  DELETE_AVATAR_REQUEST,
  LoadProfileAction,
  UploadAvatarAction,
  UploadBannerAction,
  UpdateProfileAction,
  LoadPageActionPayload,
  LoadNextPageAction,
  LoadInitialPageAction,
  PAGE_DATA,
  REMOVE_BLOCKED,
  RemoveBlockedAction,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UpdateExperienceAction,
  UpdatePrivacyAction,
  UpdateSponsorAction,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_BANNER_REQUEST,
  DeleteSponsorAction,
  AddProductAction,
  UpdateProductAction,
  DeleteProductAction,
  AddUpdateSocialAction,
  DeleteSocialAction,
  AddUserGameAction,
  DeleteUserGameAction,
  UpdateUserGameAction,
  GetGamePlatformsAction,
  UpdateGamePlatformsAction,
  GetNowPlayingGameAction,
  DeleteNowPlayingGameAction,
  UpdateNowPlayingGameAction,
  GetOnlineStatusAction,
  UpdateProfileSuccessAction,
  UpdateUserGearAction,
  DeleteUserGearAction,
  ADD_USER_GEAR_REQUEST,
  AddUserGearAction,
  GetPendingSquadAction,
  GET_PENDING_SQUAD_REQUEST,
  AcceptSquadAction,
  ACCEPT_SQUAD_REQUEST,
  DeclineSquadAction,
  DECLINE_SQUAD_REQUEST,
  DeleteSquadAction,
  DELETE_SQUAD_REQUEST,
  GetOutgoingSquadAction,
  GET_OUTGOING_SQUAD_REQUEST,
  GetUserAttributesAction,
  GET_USER_ATTRIBUTES_REQUEST,
  UpdateUserAttributesAction,
  UPDATE_USER_ATTRIBUTES_REQUEST,
  UPDATE_EXPERIENCE_SUMMARY_REQUEST,
  DELETE_EXPERIENCE_SUMMARY_REQUEST,
  UpdateExperienceSummaryAction,
  DeleteExperienceSummaryAction,
} from './types';

import {
  ProfileSettingsRequest,
  SponsorRequest,
  UserExperienceAddRequest,
  ProductRequest,
  UserPrivacy,
  SocialNetworkRequest,
  GameAddRequest,
  GameUpdateRequest,
  UserGearAddRequest,
  GamePlatform,
  User,
} from 'interfaces';
import { NowPlayingRequest } from 'interfaces/nowPlayingRequest';
import { UserAttributes } from 'interfaces/userAttributes';
import { UserExperienceSummary } from 'interfaces/userExperienceSummary';

export default {
  // Profile
  loadProfile: (): LoadProfileAction => ({
    type: LOAD_PROFILE_REQUEST,
  }),

  updateProfile: (data: ProfileSettingsRequest): UpdateProfileAction => ({
    type: UPDATE_PROFILE_REQUEST,
    payload: data,
  }),

  updateProfileSuccess: (payload: User): UpdateProfileSuccessAction => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload,
  }),

  // Avatar
  uploadAvatar: (src: string): UploadAvatarAction => ({
    type: UPLOAD_AVATAR_REQUEST,
    payload: src,
  }),

  deleteAvatar: () => ({
    type: DELETE_AVATAR_REQUEST,
  }),

  // Banner
  uploadBanner: (src: string): UploadBannerAction => ({
    type: UPLOAD_BANNER_REQUEST,
    payload: src,
  }),

  deleteBanner: () => ({
    type: DELETE_BANNER_REQUEST,
  }),

  // Followers, Friends, Blocks, Games
  loadPage: (payload: LoadPageActionPayload) => ({
    type: LOAD_PAGE_REQUEST,
    payload,
  }),

  loadNextPage: (payload: PAGE_DATA): LoadNextPageAction => ({
    type: LOAD_NEXT_PAGE,
    payload,
  }),

  loadInitialPage: (payload: PAGE_DATA): LoadInitialPageAction => ({
    type: LOAD_INITIAL_PAGE,
    payload,
  }),

  // Unblock
  removeBlocked: (payload: number): RemoveBlockedAction => ({
    type: REMOVE_BLOCKED,
    payload,
  }),

  // Sponsors
  addSponsor: (data: SponsorRequest): AddSponsorAction => ({
    type: ADD_SPONSOR_REQUEST,
    payload: data,
  }),

  updateSponsor: (data: SponsorRequest, id: number): UpdateSponsorAction => ({
    type: UPDATE_SPONSOR_REQUEST,
    payload: { data, id },
  }),

  deleteSponsor: (payload: number): DeleteSponsorAction => ({
    type: DELETE_SPONSOR_REQUEST,
    payload,
  }),

  // Experiences
  createExperience: (
    data: UserExperienceAddRequest,
  ): CreateExperienceAction => ({
    type: CREATE_EXPERIENCE_REQUEST,
    payload: data,
  }),

  updateExperience: (
    data: UserExperienceAddRequest,
    id: number,
  ): UpdateExperienceAction => ({
    type: UPDATE_EXPERIENCE_REQUEST,
    payload: { data, id },
  }),

  deleteExperience: (payload: number): DeleteExperienceAction => ({
    type: DELETE_EXPERIENCE_REQUEST,
    payload,
  }),

  getExperiences: (): GetExperiencesAction => ({
    type: GET_EXPERIENCES_REQUEST,
  }),

  // Products
  addProduct: (data: ProductRequest): AddProductAction => ({
    type: ADD_PRODUCT_REQUEST,
    payload: data,
  }),

  updateProduct: (data: ProductRequest, id: number): UpdateProductAction => ({
    type: UPDATE_PRODUCT_REQUEST,
    payload: { data, id },
  }),

  deleteProduct: (payload: number): DeleteProductAction => ({
    type: DELETE_PRODUCT_REQUEST,
    payload,
  }),

  // Social networks
  addUpdateSocial: (data: SocialNetworkRequest): AddUpdateSocialAction => ({
    type: ADD_UPDATE_SOCIAL_REQUEST,
    payload: data,
  }),

  deleteSocial: (payload: number): DeleteSocialAction => ({
    type: DELETE_SOCIAL_REQUEST,
    payload,
  }),

  // Privacy
  getPrivacy: (): GetPrivacyAction => ({
    type: GET_PRIVACY_REQUEST,
  }),

  updatePrivacy: (payload: UserPrivacy): UpdatePrivacyAction => ({
    type: UPDATE_PRIVACY_REQUEST,
    payload,
  }),

  // Game
  getGamePlatforms: (): GetGamePlatformsAction => ({
    type: GET_GAME_PLATFORMS_REQUEST,
  }),

  updateGamePlatforms: (
    payload: GamePlatform[],
  ): UpdateGamePlatformsAction => ({
    type: UPDATE_GAME_PLATFORMS,
    payload,
  }),

  addUserGame: (payload: GameAddRequest): AddUserGameAction => ({
    type: ADD_USER_GAME_REQUEST,
    payload,
  }),

  updateUserGame: (
    data: GameUpdateRequest,
    id: number,
  ): UpdateUserGameAction => ({
    type: UPDATE_USER_GAME_REQUEST,
    payload: { data, id },
  }),

  deleteUserGame: (payload: number): DeleteUserGameAction => ({
    type: DELETE_USER_GAME_REQUEST,
    payload,
  }),

  // Now Playing
  getNowPlayingGame: (): GetNowPlayingGameAction => ({
    type: GET_NOW_PLAYING_GAME_REQUEST,
  }),

  updateNowPlayingGame: (
    payload: NowPlayingRequest,
  ): UpdateNowPlayingGameAction => ({
    type: UPDATE_NOW_PLAYING_GAME_REQUEST,
    payload,
  }),

  deleteNowPlayingGame: (): DeleteNowPlayingGameAction => ({
    type: DELETE_NOW_PLAYING_GAME_REQUEST,
  }),

  // Online status
  getOnlineStatus: (): GetOnlineStatusAction => ({
    type: GET_ONLINE_STATUS_REQUEST,
  }),

  // Gears
  addUserGear: (payload: UserGearAddRequest): AddUserGearAction => ({
    type: ADD_USER_GEAR_REQUEST,
    payload,
  }),

  updateUserGear: (
    data: UserGearAddRequest,
    id: number,
  ): UpdateUserGearAction => ({
    type: UPDATE_USER_GEAR_REQUEST,
    payload: { id, data },
  }),

  deleteUserGear: (payload: number): DeleteUserGearAction => ({
    type: DELETE_USER_GEAR_REQUEST,
    payload,
  }),

  // Squad
  getPendingSquad: (): GetPendingSquadAction => ({
    type: GET_PENDING_SQUAD_REQUEST,
  }),

  getOutgoingSquad: (): GetOutgoingSquadAction => ({
    type: GET_OUTGOING_SQUAD_REQUEST,
  }),

  acceptSquad: (userId: number): AcceptSquadAction => ({
    type: ACCEPT_SQUAD_REQUEST,
    payload: userId,
  }),

  declineSquad: (userId: number): DeclineSquadAction => ({
    type: DECLINE_SQUAD_REQUEST,
    payload: userId,
  }),

  deleteSquad: (userId: number): DeleteSquadAction => ({
    type: DELETE_SQUAD_REQUEST,
    payload: userId,
  }),

  // User Attributes
  getUserAttributes: (): GetUserAttributesAction => ({
    type: GET_USER_ATTRIBUTES_REQUEST,
  }),

  updateUserAttributes: (data: UserAttributes): UpdateUserAttributesAction => ({
    type: UPDATE_USER_ATTRIBUTES_REQUEST,
    payload: data,
  }),

  updateExperienceSummary: (
    updatedExperienceSummary: UserExperienceSummary,
    currentUserAttributes: UserAttributes,
  ): UpdateExperienceSummaryAction => ({
    type: UPDATE_EXPERIENCE_SUMMARY_REQUEST,
    payload: { updatedExperienceSummary, currentUserAttributes },
  }),

  deleteExperienceSummary: (
    currentUserAttributes: UserAttributes,
  ): DeleteExperienceSummaryAction => ({
    type: DELETE_EXPERIENCE_SUMMARY_REQUEST,
    payload: currentUserAttributes,
  }),
};
