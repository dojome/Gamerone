import { createSelector } from 'reselect';
import { initState } from './reducer';
import { RootState } from '../types';
import {
  DELETE_EXPERIENCE_REQUEST,
  GET_EXPERIENCES_REQUEST,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_BANNER_REQUEST,
  ADD_SPONSOR_REQUEST,
  UPDATE_PRIVACY_REQUEST,
  CREATE_EXPERIENCE_REQUEST,
  ADD_USER_GEAR_REQUEST,
  DELETE_BANNER_REQUEST,
  DELETE_AVATAR_REQUEST,
  DELETE_SOCIAL_REQUEST,
  UPDATE_USER_ATTRIBUTES_REQUEST,
  DELETE_USER_ATTRIBUTES_REQUEST,
} from 'redux/settings/types';

import {
  UPDATE_SPONSOR_REQUEST,
  DELETE_SPONSOR_REQUEST,
  ADD_PRODUCT_REQUEST,
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  ADD_UPDATE_SOCIAL_REQUEST,
  ADD_USER_GAME_REQUEST,
  UPDATE_USER_GAME_REQUEST,
  DELETE_USER_GAME_REQUEST,
  UPDATE_USER_GEAR_REQUEST,
  DELETE_USER_GEAR_REQUEST,
  UPDATE_NOW_PLAYING_GAME_REQUEST,
  DELETE_NOW_PLAYING_GAME_REQUEST,
} from 'redux/settings/types';

import {
  ADD_POST_REQUEST,
  LOAD_POST_DETAIL_REQUEST,
  LOAD_PAGE_REQUEST,
  LOAD_FEED_REQUEST,
} from 'redux/post/types';

import {
  MULTI_FOLLOW_REQUEST,
  SET_CURRENT_PROFILE_LAYOUT_REQUEST,
  GET_PROFILE_LAYOUT_REQUEST,
} from 'redux/profile/types';
import { UPLOAD_IMAGE_REQUEST } from 'redux/post-form/types';
import { LOGIN_REQUEST, SIGNUP_REQUEST } from 'redux/auth/types';
import {
  READ_NOTIFICATION_REQUEST,
  READ_ALL_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_REQUEST,
} from 'redux/misc/types';

export const selectGlobal = (state: RootState) =>
  state.RequestStatus || initState;

export const selectStatus = createSelector(
  selectGlobal,
  (state) => state.status,
);

export const selectInProgressRequests = createSelector(
  selectGlobal,
  (state) => state.progressingRequests,
);

export const selectInProgressCount = createSelector(
  selectInProgressRequests,
  (requests) => requests.length,
);

/**
 * Auth status
 */
export const selectLoginStatus = createSelector(selectStatus, (status) =>
  status.get(LOGIN_REQUEST),
);

export const selectSignupStatus = createSelector(selectStatus, (status) =>
  status.get(SIGNUP_REQUEST),
);

export const selectMultiFollowStatus = createSelector(selectStatus, (status) =>
  status.get(MULTI_FOLLOW_REQUEST),
);

/**
 * Settings
 */
export const selectUpdateProfileStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_PROFILE_REQUEST),
);

export const selectUploadAvatarStatus = createSelector(selectStatus, (status) =>
  status.get(UPLOAD_AVATAR_REQUEST),
);

export const selectDeleteAvatarStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_AVATAR_REQUEST),
);

export const selectUploadBannerStatus = createSelector(selectStatus, (status) =>
  status.get(UPLOAD_BANNER_REQUEST),
);

export const selectDeleteBannerStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_BANNER_REQUEST),
);

export const selectIsUpdatingUserSettings = createSelector(
  [
    selectUpdateProfileStatus,
    selectUploadAvatarStatus,
    selectUploadBannerStatus,
    selectDeleteBannerStatus,
    selectDeleteAvatarStatus,
  ],
  (updateProfile, uploadAvatar, uploadBanner, deleteAvatar, deleteBanner) =>
    updateProfile?.isFetching ||
    uploadAvatar?.isFetching ||
    uploadBanner?.isFetching ||
    deleteAvatar?.isFetching ||
    deleteBanner?.isFetching,
);

/**
 * New Post
 */
export const selectPostFormImageUploadStatus = createSelector(
  selectStatus,
  (status) => status.get(UPLOAD_IMAGE_REQUEST),
);

export const selectPostFormStatus = createSelector(selectStatus, (status) =>
  status.get(ADD_POST_REQUEST),
);

// experience status
export const selectAddExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(CREATE_EXPERIENCE_REQUEST),
);

export const selectDeleteExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(DELETE_EXPERIENCE_REQUEST),
);

export const selectGetExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(GET_EXPERIENCES_REQUEST),
);

export const selectUpdateExperienceStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_EXPERIENCE_REQUEST),
);

// user attributes
export const selectUpdateUserAttributesStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_USER_ATTRIBUTES_REQUEST),
);

export const selectDeleteUserAttributesStatus = createSelector(
  selectStatus,
  (status) => status.get(DELETE_USER_ATTRIBUTES_REQUEST),
);

// sponsor status
export const selectAddSponsorStatus = createSelector(selectStatus, (status) =>
  status.get(ADD_SPONSOR_REQUEST),
);

export const selectUpdateSponsorStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_SPONSOR_REQUEST),
);

export const selectDeleteSponsorStatus = createSelector(
  selectStatus,
  (status) => status.get(DELETE_SPONSOR_REQUEST),
);

/**
 * Store status
 */
export const selectAddProductStatus = createSelector(selectStatus, (status) =>
  status.get(ADD_PRODUCT_REQUEST),
);

export const selectUpdateStoreStatus = createSelector(selectStatus, (status) =>
  status.get(UPDATE_PRODUCT_REQUEST),
);

export const selectDeleteStoreStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_PRODUCT_REQUEST),
);

export const selectUpdatePrivacyStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_PRIVACY_REQUEST),
);

/**
 * Social Networks status
 */
export const selectAddUpdateSocialStatus = createSelector(
  selectStatus,
  (status) => status.get(ADD_UPDATE_SOCIAL_REQUEST),
);

export const selectDeleteSocialStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_SOCIAL_REQUEST),
);

/**
 * React Grid Layout status for profile
 */
export const selectSetLayoutStatus = createSelector(selectStatus, (status) =>
  status.get(SET_CURRENT_PROFILE_LAYOUT_REQUEST),
);

export const selectGetLayoutStatus = createSelector(selectStatus, (status) =>
  status.get(GET_PROFILE_LAYOUT_REQUEST),
);

/**
 * Settings Games status
 */
export const selectAddUserGameStatus = createSelector(selectStatus, (status) =>
  status.get(ADD_USER_GAME_REQUEST),
);

export const selectUpdateUserGameStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_USER_GAME_REQUEST),
);

export const selectDeleteGameStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_USER_GAME_REQUEST),
);

/**
 * Settings Gears status
 */
export const selectAddGearStatus = createSelector(selectStatus, (status) =>
  status.get(ADD_USER_GEAR_REQUEST),
);

export const selectUpdateGearStatus = createSelector(selectStatus, (status) =>
  status.get(UPDATE_USER_GEAR_REQUEST),
);

export const selectDeleteGearStatus = createSelector(selectStatus, (status) =>
  status.get(DELETE_USER_GEAR_REQUEST),
);

/**
 * Now playing status
 */
export const selectUpdateNowPlayingStatus = createSelector(
  selectStatus,
  (status) => status.get(UPDATE_NOW_PLAYING_GAME_REQUEST),
);

export const selectDeleteNowPlayingStatus = createSelector(
  selectStatus,
  (status) => status.get(DELETE_NOW_PLAYING_GAME_REQUEST),
);

/**
 * Post
 */
export const selectLoadPostDetailStatus = createSelector(
  selectStatus,
  (status) => status.get(LOAD_POST_DETAIL_REQUEST),
);

export const selectLoadCommentStatus = createSelector(selectStatus, (status) =>
  status.get(LOAD_PAGE_REQUEST + '/comments'),
);

/**
 * Feed
 */
export const selectHomeFeedStatus = createSelector(selectStatus, (status) =>
  status.get(LOAD_FEED_REQUEST + '/home'),
);

/**
 * Notfication
 */
export const selectGetNotificationsStatus = createSelector(
  selectStatus,
  (status) => status.get(GET_NOTIFICATIONS_REQUEST),
);

export const selecctReadNotificationStatus = createSelector(
  selectStatus,
  (status) => status.get(READ_NOTIFICATION_REQUEST),
);

export const selectMarkAllNotificationsStatus = createSelector(
  selectStatus,
  (status) => status.get(READ_ALL_NOTIFICATIONS_REQUEST),
);
