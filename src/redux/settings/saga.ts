import {
  call,
  all,
  select,
  takeLatest,
  takeEvery,
  put,
  fork,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Nullable } from 'interfaces';
import * as ProfileApi from 'api/profile';
import * as FriendsApi from 'api/friends';
import * as ReferenceApi from 'api/referenceData';
import * as SquadApi from 'api/squad';
import {
  UPDATE_PROFILE_REQUEST,
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_BANNER_REQUEST,
  LOAD_PAGE_REQUEST,
  LOAD_PAGE_SUCCESS,
  LOAD_NEXT_PAGE,
  LOAD_INITIAL_PAGE,
  UPLOAD_AVATAR_SUCCESS,
  UPDATE_SPONSOR_REQUEST,
  DELETE_SPONSOR_REQUEST,
  ADD_PRODUCT_REQUEST, // product
  UPDATE_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  GET_PRIVACY_REQUEST,
  GET_PRIVACY_SUCCESS,
  UPDATE_PRIVACY_REQUEST,
  UPDATE_PRIVACY_SUCCESS,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  UPDATE_SPONSORS,
  UPDATE_PRODUCTS,
  ADD_UPDATE_SOCIAL_REQUEST,
  DELETE_SOCIAL_REQUEST,
  UPDATE_SOCIAL_NETWORKS,
  ADD_USER_GAME_REQUEST,
  CREATE_USER_GAME_SUCCESS,
  DELETE_USER_GAME_REQUEST,
  DELETE_USER_GAME_SUCCESS,
  UPDATE_USER_GAME_REQUEST,
  UPDATE_USER_GAME_SUCCESS,
  GET_GAME_PLATFORMS_REQUEST,
  UPDATE_GAME_PLATFORMS,
  GET_NOW_PLAYING_GAME_REQUEST,
  NOW_PLAYING_GAME,
  UPDATE_NOW_PLAYING_GAME_REQUEST,
  DELETE_NOW_PLAYING_GAME_REQUEST,
  GET_ONLINE_STATUS_REQUEST,
  UPDATE_USER_GEAR_REQUEST,
  UPDATE_USER_GEAR_SUCCESS,
  DELETE_USER_GEAR_REQUEST,
  UpdatePrivacyAction,
  UpdateProfileAction,
  UploadAvatarAction,
  UploadBannerAction,
  UpdateSponsorAction,
  DeleteSponsorAction,
  AddProductAction,
  UpdateProductAction,
  DeleteProductAction,
  LoadPageAction,
  LoadNextPageAction,
  LoadPageActionPayload,
  LoadInitialPageAction,
  LoadPageSuccessActionPayload,
  UpdateUserGearAction,
  DeleteUserGearAction,
  UPDATE_EXPERIENCE_REQUEST,
  UpdateExperienceAction,
  DELETE_EXPERIENCE_REQUEST,
  DeleteExperienceAction,
  GET_EXPERIENCES_REQUEST,
  CreateExperienceAction,
  CREATE_EXPERIENCE_REQUEST,
  ADD_SPONSOR_REQUEST,
  AddSponsorAction,
  AddUpdateSocialAction,
  DeleteSocialAction,
  AddUserGameAction,
  DeleteUserGameAction,
  UpdateUserGameAction,
  UpdateNowPlayingGameAction,
  DELETE_USER_GEAR_SUCCESS,
  UPDATE_EXPERIENCES,
  ADD_USER_GEAR_REQUEST,
  ADD_USER_GEAR_SUCCESS,
  AddUserGearAction,
  DELETE_AVATAR_REQUEST,
  DELETE_BANNER_REQUEST,
  DeclineSquadAction,
  DeleteSquadAction,
  ACCEPT_SQUAD_REQUEST,
  ACCEPT_SQUAD_SUCCESS,
  DECLINE_SQUAD_REQUEST,
  DECLINE_SQUAD_SUCCESS,
  DELETE_SQUAD_REQUEST,
  GET_PENDING_SQUAD_REQUEST,
  GET_PENDING_SQUAD_SUCCESS,
  AcceptSquadAction,
  GET_OUTGOING_SQUAD_REQUEST,
  GET_OUTGOING_SQUAD_SUCCESS,
  GET_EXPERIENCES_SUCCESS,
  GET_USER_ATTRIBUTES_REQUEST,
  GET_USER_ATTRIBUTES_SUCCESS,
  UPDATE_USER_ATTRIBUTES_REQUEST,
  UPDATE_USER_ATTRIBUTES_SUCCESS,
  UpdateUserAttributesAction,
  DELETE_USER_ATTRIBUTES_REQUEST,
  DELETE_USER_ATTRIBUTES_SUCCESS,
  UPDATE_EXPERIENCE_SUMMARY_REQUEST,
  DELETE_EXPERIENCE_SUMMARY_REQUEST,
  UpdateExperienceSummaryAction,
  DeleteExperienceSummaryAction,
} from './types';

import SettingsActions from './actions';
import RequestStatusActions from 'redux/request-status/actions';
import AuthActions from 'redux/auth/actions';
import ProfileActions from 'redux/profile/actions';
import DialogActions from 'redux/dialogs/actions';

import { RootState } from 'redux/types';
import { UserPagedResponse } from 'interfaces/userPagedResponse';
import { UNBLOCK_SUCCESS, UnblockSuccessAction } from 'redux/profile/types';
import { Notify } from 'components/utility/Notify';
import { selectCurrentUserId } from '../auth/selectors';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { getFileFromUrl } from 'utils/image';
import { UserAttributesModel } from 'models/UserAttributes';

const PagedApi = {
  blocks: FriendsApi.blocks,
  games: ProfileApi.getUserGames,
  gears: ProfileApi.getUserGears,
};

/**
 * Update profile
 */
export function* updateProfileRequest() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, function* ({
    payload,
  }: UpdateProfileAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_PROFILE_REQUEST));

    try {
      const user = yield call(ProfileApi.updateProfile, payload);
      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));
      yield put(RequestStatusActions.finishRequest(UPDATE_PROFILE_REQUEST));

      // Notify.success('Profile successfully updated.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_PROFILE_REQUEST, err),
      );
    }
  });
}

/**
 * Avatar
 */
export function* uploadAvatarRequest() {
  yield takeLatest(UPLOAD_AVATAR_REQUEST, function* ({
    payload,
  }: UploadAvatarAction) {
    yield put(RequestStatusActions.startRequest(UPLOAD_AVATAR_REQUEST));
    try {
      const file = yield call(getFileFromUrl, payload);
      const user = yield call(ProfileApi.uploadAvatar, file);

      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));
      yield put({
        type: UPLOAD_AVATAR_SUCCESS,
      });
      yield put(RequestStatusActions.finishRequest(UPLOAD_AVATAR_REQUEST));
      // Notify.success('Avatar uploaded successfully.');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UPLOAD_AVATAR_REQUEST, err));
    }
  });
}

export function* uploadAvatarSuccess() {
  yield takeLatest(UPLOAD_AVATAR_SUCCESS, function* () {
    const path = yield select(
      (state: RootState) => state.router.location.pathname,
    );

    if (path && (path as string).includes('/signup')) {
      yield put(push('/'));
    }
  });
}

export function* deleteAvatarRequest() {
  yield takeLatest(DELETE_AVATAR_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(DELETE_AVATAR_REQUEST));
    try {
      const user = yield call(ProfileApi.deleteAvatar);

      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));
      yield put(RequestStatusActions.finishRequest(DELETE_AVATAR_REQUEST));
      // Notify.success('Reset avatar done.');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_AVATAR_REQUEST, err));
    }
  });
}

/**
 * Banner
 */
export function* uploadBannerRequest() {
  yield takeLatest(UPLOAD_BANNER_REQUEST, function* ({
    payload,
  }: UploadBannerAction) {
    yield put(RequestStatusActions.startRequest(UPLOAD_BANNER_REQUEST));

    try {
      const file = yield call(getFileFromUrl, payload);
      const user = yield call(ProfileApi.uploadBanner, file);
      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));

      yield put(RequestStatusActions.finishRequest(UPLOAD_BANNER_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(UPLOAD_BANNER_REQUEST, err));
    }
  });
}

export function* deleteBannerRequest() {
  yield takeLatest(DELETE_BANNER_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(DELETE_BANNER_REQUEST));
    try {
      const user = yield call(ProfileApi.deleteBanner);

      yield put(SettingsActions.updateProfileSuccess(user));
      yield put(AuthActions.updateCurrentUser(user));
      yield put(RequestStatusActions.finishRequest(DELETE_BANNER_REQUEST));
      // Notify.success('Reset banner done.');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_BANNER_REQUEST, err));
    }
  });
}

/**
 * Create a sponsor
 */
export function* addSponsorRequest() {
  yield takeLatest(ADD_SPONSOR_REQUEST, function* ({
    payload,
  }: AddSponsorAction) {
    yield put(RequestStatusActions.startRequest(ADD_SPONSOR_REQUEST));

    try {
      const sponsors = yield call(ProfileApi.addSponsor, payload);
      yield put({
        type: UPDATE_SPONSORS,
        payload: sponsors,
      });
      yield put(RequestStatusActions.finishRequest(ADD_SPONSOR_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_SPONSOR));
      // Notify.success('Successfully added a sponsor');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_SPONSOR_REQUEST, err));
      Notify.error(
        'Something went wrong while creating a sponsor. Please try again',
      );
    }
  });
}

/**
 * Update a sponsor
 */
export function* updateSponsorRequest() {
  yield takeLatest(UPDATE_SPONSOR_REQUEST, function* ({
    payload,
  }: UpdateSponsorAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_SPONSOR_REQUEST));

    try {
      const sponsors = yield call(
        ProfileApi.updateSponsor,
        payload.id,
        payload.data,
      );
      yield put({
        type: UPDATE_SPONSORS,
        payload: sponsors,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_SPONSOR_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_SPONSOR));
      // Notify.success('Sponsor updated successfully.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_SPONSOR_REQUEST, err),
      );
    }
  });
}

/**
 * Delete a sponsor
 */
export function* deleteSponsorRequest() {
  yield takeLatest(DELETE_SPONSOR_REQUEST, function* ({
    payload,
  }: DeleteSponsorAction) {
    yield put(RequestStatusActions.startRequest(DELETE_SPONSOR_REQUEST));

    try {
      const sponsors = yield call(ProfileApi.deleteSponsor, payload);
      yield put({
        type: UPDATE_SPONSORS,
        payload: sponsors,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_SPONSOR_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_SPONSOR));
      // Notify.success('Sponsor deleted successfully');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_SPONSOR_REQUEST, err),
      );
    }
  });
}

/**
 * Create a product
 */
export function* createProductRequest() {
  yield takeLatest(ADD_PRODUCT_REQUEST, function* ({
    payload,
  }: AddProductAction) {
    yield put(RequestStatusActions.startRequest(ADD_PRODUCT_REQUEST));

    try {
      const products = yield call(ProfileApi.createProduct, payload);
      yield put({
        type: UPDATE_PRODUCTS,
        payload: products,
      });
      yield put(RequestStatusActions.finishRequest(ADD_PRODUCT_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_PRODUCT));
      // Notify.success('Product added successfully.');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_PRODUCT_REQUEST, err));
      Notify.error(
        'Something went wrong while adding a product. Please try again.',
      );
    }
  });
}

/**
 * Update a product
 */
export function* updateProductRequest() {
  yield takeLatest(UPDATE_PRODUCT_REQUEST, function* ({
    payload,
  }: UpdateProductAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_PRODUCT_REQUEST));

    try {
      const products = yield call(
        ProfileApi.updateProduct,
        payload.id,
        payload.data,
      );
      yield put({
        type: UPDATE_PRODUCTS,
        payload: products,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_PRODUCT_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_PRODUCT));
      // Notify.success('Product updated successfully.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_PRODUCT_REQUEST, err),
      );
    }
  });
}

/**
 * Delete a product
 */
export function* deleteProductRequest() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, function* ({
    payload,
  }: DeleteProductAction) {
    yield put(RequestStatusActions.startRequest(DELETE_PRODUCT_REQUEST));

    try {
      const products = yield call(ProfileApi.deleteProduct, payload);
      yield put({
        type: UPDATE_PRODUCTS,
        payload: products,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_PRODUCT_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_PRODUCT));
      // Notify.success('Product deleted successfully.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_PRODUCT_REQUEST, err),
      );
    }
  });
}

/**
 * Social Networks
 */

// Update a social
export function* addUpdateSocialRequest() {
  yield takeLatest(ADD_UPDATE_SOCIAL_REQUEST, function* ({
    payload,
  }: AddUpdateSocialAction) {
    yield put(RequestStatusActions.startRequest(ADD_UPDATE_SOCIAL_REQUEST));

    try {
      const socials = yield call(ProfileApi.addUpdateSocial, payload);
      yield put({
        type: UPDATE_SOCIAL_NETWORKS,
        payload: socials,
      });
      yield put(RequestStatusActions.finishRequest(ADD_UPDATE_SOCIAL_REQUEST));
      // Notify.success('Social networks updated.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(ADD_UPDATE_SOCIAL_REQUEST, err),
      );
    }
  });
}

/**
 * Delete a social
 */
export function* deleteSocialRequest() {
  yield takeLatest(DELETE_SOCIAL_REQUEST, function* ({
    payload,
  }: DeleteSocialAction) {
    yield put(RequestStatusActions.startRequest(DELETE_SOCIAL_REQUEST));

    try {
      const social = yield call(ProfileApi.deleteSocial, payload);
      yield put({
        type: UPDATE_SOCIAL_NETWORKS,
        payload: social,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_SOCIAL_REQUEST));
      // Notify.success('Social network deleted.');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_SOCIAL_REQUEST, err));
    }
  });
}

/**
 * Unblock success
 */

export function* unblockSuccess() {
  yield takeEvery(UNBLOCK_SUCCESS, function* ({
    payload,
  }: UnblockSuccessAction) {
    yield put(SettingsActions.removeBlocked(payload));
  });
}

/**
 * Blocks, Gears, Games pagination
 *
 * Note: __ takeEvery or takeLatest __
 *
 * takeLatest: collided with gears request
 */
export function* loadPageRequest() {
  yield takeEvery(LOAD_PAGE_REQUEST, function* ({ payload }: LoadPageAction) {
    const { key, page, dataApi } = payload;
    const REQUEST_NAME = LOAD_PAGE_REQUEST + '/' + key;

    yield put(RequestStatusActions.startRequest(REQUEST_NAME));

    try {
      let response;

      // As Games, Gears paginated APIs requires userId, we need to pass in current user id
      if (key === 'games' || key === 'gears') {
        const userId = yield select(selectCurrentUserId);
        if (userId) {
          response = yield call<typeof dataApi>(dataApi, userId, page);
        }
      } else {
        response = yield call<typeof dataApi>(dataApi, page);
      }
      yield put({
        type: LOAD_PAGE_SUCCESS,
        payload: {
          key,
          response,
        } as LoadPageSuccessActionPayload,
      });

      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, null));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(REQUEST_NAME, err));
    }
  });
}

export function* loadInitialPage() {
  yield takeLatest(LOAD_INITIAL_PAGE, function* ({
    payload: key,
  }: LoadInitialPageAction) {
    const currentResponse = (yield select(
      ({ Settings }: RootState) => Settings.pageResponse[key],
    )) as Nullable<UserPagedResponse>;

    if (currentResponse === null) {
      yield put({
        type: LOAD_NEXT_PAGE,
        payload: key,
      });
    }
  });
}

export function* loadNextPage() {
  yield takeLatest(LOAD_NEXT_PAGE, function* ({
    payload: key,
  }: LoadNextPageAction) {
    const currentResponse = (yield select(
      ({ Settings }: RootState) => Settings.pageResponse[key],
    )) as Nullable<UserPagedResponse>;

    const requestPayload = {
      key,
      page: currentResponse ? currentResponse.currentPage + 1 : 0,
      dataApi: PagedApi[key],
    } as LoadPageActionPayload;

    if (!currentResponse || currentResponse.nextPageUrl)
      yield put({
        type: LOAD_PAGE_REQUEST,
        payload: requestPayload,
      });
    else {
      // Reached page end
    }
  });
}

/**
 * Privacy
 */
export function* getPrivacyRequest() {
  yield takeLatest(GET_PRIVACY_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_PRIVACY_REQUEST));

    try {
      const response = yield call(ProfileApi.getPrivacySettings);
      yield put({
        type: GET_PRIVACY_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(GET_PRIVACY_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(GET_PRIVACY_REQUEST, err));
    }
  });
}

export function* updatePrivacyRequest() {
  yield takeLatest(UPDATE_PRIVACY_REQUEST, function* ({
    payload,
  }: UpdatePrivacyAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_PRIVACY_REQUEST));

    try {
      const response = yield call(ProfileApi.updatePrivacySettings, payload);
      yield put({
        type: UPDATE_PRIVACY_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_PRIVACY_REQUEST));
      // Notify.success('Privacy Option updated successfully.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_PRIVACY_REQUEST, err),
      );
    }
  });
}

/**
 * Update experience
 */
export function* updateExperienceRequest() {
  yield takeLatest(UPDATE_EXPERIENCE_REQUEST, function* ({
    payload,
  }: UpdateExperienceAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_EXPERIENCE_REQUEST));

    try {
      const experience = yield call(
        ProfileApi.updateExperience,
        payload.id,
        payload.data,
      );
      yield put({
        type: UPDATE_EXPERIENCES,
        payload: experience,
      });
      yield put(RequestStatusActions.finishRequest(UPDATE_EXPERIENCE_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.SETTINGS_EXPERIENCE));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_EXPERIENCE_REQUEST, err),
      );
    }
  });
}

export function* createExperienceRequest() {
  yield takeLatest(CREATE_EXPERIENCE_REQUEST, function* ({
    payload,
  }: CreateExperienceAction) {
    yield put(RequestStatusActions.startRequest(CREATE_EXPERIENCE_REQUEST));

    try {
      const experiences = yield call(ProfileApi.createExperience, payload);
      yield put({
        type: UPDATE_EXPERIENCES,
        payload: experiences,
      });
      yield put(RequestStatusActions.finishRequest(CREATE_EXPERIENCE_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.SETTINGS_EXPERIENCE));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(CREATE_EXPERIENCE_REQUEST, err),
      );
    }
  });
}

export function* deleteExperienceRequest() {
  yield takeLatest(DELETE_EXPERIENCE_REQUEST, function* ({
    payload,
  }: DeleteExperienceAction) {
    yield put(RequestStatusActions.startRequest(DELETE_EXPERIENCE_REQUEST));

    try {
      const experiences = yield call(ProfileApi.deleteExperience, payload);
      yield put({
        type: UPDATE_EXPERIENCES,
        payload: experiences,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_EXPERIENCE_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.SETTINGS_EXPERIENCE));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_EXPERIENCE_REQUEST, err),
      );
    }
  });
}

export function* getExperiencesRequest() {
  yield takeLatest(GET_EXPERIENCES_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_EXPERIENCES_REQUEST));
    try {
      const experiences = yield call(ProfileApi.getExperiences);
      yield put({
        type: GET_EXPERIENCES_SUCCESS,
        payload: experiences,
      });
      yield put(RequestStatusActions.finishRequest(GET_EXPERIENCES_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_EXPERIENCES_REQUEST, err),
      );
    }
  });
}

export function* getUserAttributesRequest() {
  yield takeLatest(GET_USER_ATTRIBUTES_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_USER_ATTRIBUTES_REQUEST));
    try {
      const userAttributes = yield call(ProfileApi.getUserAttributes);
      yield put({
        type: GET_USER_ATTRIBUTES_SUCCESS,
        payload: userAttributes,
      });
      yield put(
        RequestStatusActions.finishRequest(GET_USER_ATTRIBUTES_REQUEST),
      );
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_USER_ATTRIBUTES_REQUEST, err),
      );
    }
  });
}

export function* updateUserAttributesRequest() {
  yield takeLatest(UPDATE_USER_ATTRIBUTES_REQUEST, function* ({
    payload,
  }: UpdateUserAttributesAction) {
    yield put(
      RequestStatusActions.startRequest(UPDATE_USER_ATTRIBUTES_REQUEST),
    );
    try {
      const userAttributes = yield call(
        ProfileApi.addUpdateDeleteUserAttributes,
        payload,
      );
      yield put({
        type: UPDATE_USER_ATTRIBUTES_SUCCESS,
        payload: userAttributes,
      });
      yield put(
        RequestStatusActions.finishRequest(UPDATE_USER_ATTRIBUTES_REQUEST),
      );
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_USER_ATTRIBUTES_REQUEST, err),
      );
    }
  });
}

export function* updateUAExperienceSummaryRequest() {
  yield takeLatest(UPDATE_EXPERIENCE_SUMMARY_REQUEST, function* ({
    payload,
  }: UpdateExperienceSummaryAction) {
    yield put(
      RequestStatusActions.startRequest(UPDATE_USER_ATTRIBUTES_REQUEST),
    );
    try {
      const { updatedExperienceSummary, currentUserAttributes } = payload;

      // ONLY modify the experienceSummary
      const uaModel = new UserAttributesModel().fromDto(currentUserAttributes);
      uaModel.experienceSummary = updatedExperienceSummary.experienceSummary;

      const userAttributes = yield call(
        ProfileApi.addUpdateDeleteUserAttributes,
        uaModel,
      );
      yield put({
        type: UPDATE_USER_ATTRIBUTES_SUCCESS,
        payload: userAttributes,
      });
      yield put(
        RequestStatusActions.finishRequest(UPDATE_USER_ATTRIBUTES_REQUEST),
      );
      yield put(
        DialogActions.closeDialog(DialogTypeEnum.SETTINGS_EXPERIENCE_SUMMARY),
      );
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_USER_ATTRIBUTES_REQUEST, err),
      );
    }
  });
}

export function* deleteUAExperienceSummaryRequest() {
  yield takeLatest(DELETE_EXPERIENCE_SUMMARY_REQUEST, function* ({
    payload,
  }: DeleteExperienceSummaryAction) {
    yield put(
      RequestStatusActions.startRequest(DELETE_USER_ATTRIBUTES_REQUEST),
    );
    try {
      // ONLY modify the experienceSummary
      const uaModel = new UserAttributesModel().fromDto(payload);
      uaModel.experienceSummary = null;

      const userAttributes = yield call(
        ProfileApi.addUpdateDeleteUserAttributes,
        uaModel,
      );
      yield put({
        type: DELETE_USER_ATTRIBUTES_SUCCESS,
        payload: userAttributes,
      });
      yield put(
        RequestStatusActions.finishRequest(DELETE_USER_ATTRIBUTES_REQUEST),
      );
      yield put(
        DialogActions.closeDialog(DialogTypeEnum.SETTINGS_EXPERIENCE_SUMMARY),
      );
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_USER_ATTRIBUTES_REQUEST, err),
      );
    }
  });
}

/*
 *   Load profile
 *  * Load self profile
 */
export function* loadProfileRequest() {
  yield takeLatest(LOAD_PROFILE_REQUEST, function* () {
    yield put(SettingsActions.getPrivacy());
    yield put(RequestStatusActions.startRequest(LOAD_PROFILE_REQUEST));

    try {
      const userId = yield select(selectCurrentUserId);
      const response = yield call(ProfileApi.getProfile, userId);
      yield put({
        type: LOAD_PROFILE_SUCCESS,
        payload: response,
      });

      yield put(RequestStatusActions.finishRequest(LOAD_PROFILE_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(LOAD_PROFILE_REQUEST, err));
    }
  });
}

/**
 * Games
 */

// Get game platforms
export function* getGamePlatformsRequest() {
  yield takeLatest(GET_GAME_PLATFORMS_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_GAME_PLATFORMS_REQUEST));

    try {
      const gamePlatforms = yield call(ReferenceApi.gamePlatforms);
      yield put({
        type: UPDATE_GAME_PLATFORMS,
        payload: gamePlatforms,
      });
      yield put(RequestStatusActions.finishRequest(GET_GAME_PLATFORMS_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_GAME_PLATFORMS_REQUEST, err),
      );
    }
  });
}

// Add a User Game
export function* addUserGameRequest() {
  yield takeLatest(ADD_USER_GAME_REQUEST, function* ({
    payload,
  }: AddUserGameAction) {
    yield put(RequestStatusActions.startRequest(ADD_USER_GAME_REQUEST));

    try {
      const userGame = yield call(ProfileApi.addUserGame, payload);
      yield put({
        type: CREATE_USER_GAME_SUCCESS,
        payload: userGame,
      });
      yield put(DialogActions.closeDialog(DialogTypeEnum.SETTINGS_GAME));
      yield put(RequestStatusActions.finishRequest(ADD_USER_GAME_REQUEST));
      // Notify.success('Successfully added a game');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_USER_GAME_REQUEST, err));
    }
  });
}

// Update a  UserGame
export function* updateUserGameRequest() {
  yield takeLatest(UPDATE_USER_GAME_REQUEST, function* ({
    payload,
  }: UpdateUserGameAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_USER_GAME_REQUEST));

    try {
      const userGame = yield call(
        ProfileApi.updateUserGame,
        payload.id,
        payload.data,
      );
      yield put({
        type: UPDATE_USER_GAME_SUCCESS,
        payload: userGame,
      });
      yield put(DialogActions.closeDialog(DialogTypeEnum.SETTINGS_GAME));
      yield put(RequestStatusActions.finishRequest(UPDATE_USER_GAME_REQUEST));
      // Notify.success('Successfully updated a game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_USER_GAME_REQUEST, err),
      );
    }
  });
}

// Delete a  UserGame
export function* deleteUserGameRequest() {
  yield takeLatest(DELETE_USER_GAME_REQUEST, function* ({
    payload,
  }: DeleteUserGameAction) {
    yield put(RequestStatusActions.startRequest(DELETE_USER_GAME_REQUEST));

    try {
      yield call(ProfileApi.deleteUserGame, payload);
      yield put({
        type: DELETE_USER_GAME_SUCCESS,
        payload,
      });
      yield put(RequestStatusActions.finishRequest(DELETE_USER_GAME_REQUEST));
      yield put(DialogActions.closeDialog(DialogTypeEnum.SETTINGS_GAME));
      // Notify.success('Successfully deleted a game');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_USER_GAME_REQUEST, err),
      );
    }
  });
}

/**
 * Gears
 */
export function* addUserGearRequest() {
  yield takeLatest(ADD_USER_GEAR_REQUEST, function* ({
    payload,
  }: AddUserGearAction) {
    yield put(RequestStatusActions.startRequest(ADD_USER_GEAR_REQUEST));

    try {
      const response = yield call(ProfileApi.addGear, payload);
      yield put({
        type: ADD_USER_GEAR_SUCCESS,
        payload: response,
      });
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_GEAR));
      // Notify.success('Successfully added gear');
      yield put(RequestStatusActions.finishRequest(ADD_USER_GEAR_REQUEST));
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ADD_USER_GEAR_REQUEST, err));
    }
  });
}

export function* updateUserGearRequest() {
  yield takeLatest(UPDATE_USER_GEAR_REQUEST, function* ({
    payload,
  }: UpdateUserGearAction) {
    yield put(RequestStatusActions.startRequest(UPDATE_USER_GEAR_REQUEST));

    try {
      const response = yield call(
        ProfileApi.updateGear,
        payload.id,
        payload.data,
      );
      yield put({
        type: UPDATE_USER_GEAR_SUCCESS,
        payload: response,
      });
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_GEAR));
      // Notify.success('Successfully updated gear');
      yield put(RequestStatusActions.finishRequest(UPDATE_USER_GEAR_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(UPDATE_USER_GEAR_REQUEST, err),
      );
    }
  });
}

export function* deleteUserGearRequest() {
  yield takeLatest(DELETE_USER_GEAR_REQUEST, function* ({
    payload,
  }: DeleteUserGearAction) {
    yield put(RequestStatusActions.startRequest(DELETE_USER_GEAR_REQUEST));

    try {
      yield call(ProfileApi.deleteGear, payload);
      yield put({
        type: DELETE_USER_GEAR_SUCCESS,
        payload,
      });
      yield put(DialogActions.closeDialog(DialogTypeEnum.FORM_GEAR));
      // Notify.success('Successfully deleted gear');
      yield put(RequestStatusActions.finishRequest(DELETE_USER_GEAR_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(DELETE_USER_GEAR_REQUEST, err),
      );
    }
  });
}

/**
 * Get now playing game
 */
export function* getNowPlayingGameRequest() {
  yield takeLatest(GET_NOW_PLAYING_GAME_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_NOW_PLAYING_GAME_REQUEST));

    try {
      const userId = yield select(selectCurrentUserId);
      const nowPlayingGame = yield call(ProfileApi.getNowPlayingGame, userId);
      yield put({
        type: NOW_PLAYING_GAME,
        payload: nowPlayingGame,
      });
      yield put(
        RequestStatusActions.finishRequest(GET_NOW_PLAYING_GAME_REQUEST),
      );
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_NOW_PLAYING_GAME_REQUEST, err),
      );
    }
  });
}

/**
 * Update now playing game
 */
export function* updateNowPlayingGameRequest() {
  yield takeLatest(UPDATE_NOW_PLAYING_GAME_REQUEST, function* ({
    payload,
  }: UpdateNowPlayingGameAction) {
    yield put(
      RequestStatusActions.startRequest(UPDATE_NOW_PLAYING_GAME_REQUEST),
    );

    try {
      const nowPlayingGame = yield call(
        ProfileApi.updateNowPlayingGame,
        payload,
      );
      yield put({
        type: NOW_PLAYING_GAME,
        payload: nowPlayingGame,
      });
      yield put(
        RequestStatusActions.finishRequest(UPDATE_NOW_PLAYING_GAME_REQUEST),
      );
      // Notify.success('Now playing updated.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(
          UPDATE_NOW_PLAYING_GAME_REQUEST,
          err,
        ),
      );
    }
  });
}

/**
 * Delete now playing game
 */
export function* deleteNowPlayingGameRequest() {
  yield takeLatest(DELETE_NOW_PLAYING_GAME_REQUEST, function* () {
    yield put(
      RequestStatusActions.startRequest(DELETE_NOW_PLAYING_GAME_REQUEST),
    );

    try {
      const nowPlayingGame = yield call(ProfileApi.deleteNowPlayingGame);
      yield put({
        type: NOW_PLAYING_GAME,
        payload: nowPlayingGame,
      });
      yield put(
        RequestStatusActions.finishRequest(DELETE_NOW_PLAYING_GAME_REQUEST),
      );
      // Notify.success('Now playing deleted.');
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(
          DELETE_NOW_PLAYING_GAME_REQUEST,
          err,
        ),
      );
    }
  });
}

/**
 * Get online status
 */
export function* getOnlineStatusRequest() {
  yield takeLatest(GET_ONLINE_STATUS_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_ONLINE_STATUS_REQUEST));

    try {
      const nowPlayingGame = yield call(ProfileApi.getOnlineStatus);
      yield put({
        type: NOW_PLAYING_GAME,
        payload: nowPlayingGame,
      });
      yield put(RequestStatusActions.finishRequest(GET_ONLINE_STATUS_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_ONLINE_STATUS_REQUEST, err),
      );
    }
  });
}

/**
 * Squad
 */
export function* acceptSquadRequest() {
  yield takeLatest(ACCEPT_SQUAD_REQUEST, function* ({
    payload,
  }: AcceptSquadAction) {
    yield put(RequestStatusActions.startRequest(ACCEPT_SQUAD_REQUEST));

    try {
      yield call(SquadApi.acceptSquadRequest, payload);
      yield put({
        type: ACCEPT_SQUAD_SUCCESS,
        payload,
      });
      yield put(ProfileActions.getSquad());
      yield put(RequestStatusActions.finishRequest(ACCEPT_SQUAD_REQUEST));
      // Notify.success('Accepted a squad request.');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(ACCEPT_SQUAD_REQUEST, err));
    }
  });
}

export function* declineSquadRequest() {
  yield takeLatest(DECLINE_SQUAD_REQUEST, function* ({
    payload,
  }: DeclineSquadAction) {
    yield put(RequestStatusActions.startRequest(DECLINE_SQUAD_REQUEST));

    try {
      yield call(SquadApi.declineSquadRequest, payload);
      yield put({
        type: DECLINE_SQUAD_SUCCESS,
        payload,
      });
      yield put(RequestStatusActions.finishRequest(DECLINE_SQUAD_REQUEST));
      // Notify.success('Declined a squad request.');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DECLINE_SQUAD_REQUEST, err));
    }
  });
}

export function* deleteSquadRequest() {
  yield takeLatest(DELETE_SQUAD_REQUEST, function* ({
    payload,
  }: DeleteSquadAction) {
    yield put(RequestStatusActions.startRequest(DELETE_SQUAD_REQUEST));

    try {
      yield call(SquadApi.deleteFromSquad, payload);

      yield put(ProfileActions.getSquad());
      yield put(RequestStatusActions.finishRequest(DELETE_SQUAD_REQUEST));
      // Notify.success('Deleted from the squad');
    } catch (err) {
      yield put(RequestStatusActions.finishRequest(DELETE_SQUAD_REQUEST, err));
    }
  });
}

export function* getPendingSquadRequest() {
  yield takeLatest(GET_PENDING_SQUAD_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_PENDING_SQUAD_REQUEST));

    try {
      const response = yield call(SquadApi.getWaitingInvites);
      yield put({
        type: GET_PENDING_SQUAD_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(GET_PENDING_SQUAD_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_PENDING_SQUAD_REQUEST, err),
      );
    }
  });
}

export function* getOutgoingSquadRequest() {
  yield takeLatest(GET_OUTGOING_SQUAD_REQUEST, function* () {
    yield put(RequestStatusActions.startRequest(GET_OUTGOING_SQUAD_REQUEST));

    try {
      const response = yield call(SquadApi.getOutgoingInvites);
      yield put({
        type: GET_OUTGOING_SQUAD_SUCCESS,
        payload: response,
      });
      yield put(RequestStatusActions.finishRequest(GET_OUTGOING_SQUAD_REQUEST));
    } catch (err) {
      yield put(
        RequestStatusActions.finishRequest(GET_OUTGOING_SQUAD_REQUEST, err),
      );
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(loadProfileRequest),
    fork(updateProfileRequest),

    fork(uploadAvatarRequest),
    fork(uploadBannerRequest),
    fork(uploadAvatarSuccess),
    fork(deleteAvatarRequest),
    fork(deleteBannerRequest),

    fork(addSponsorRequest),
    fork(updateSponsorRequest),
    fork(deleteSponsorRequest),

    fork(createProductRequest),
    fork(updateProductRequest),
    fork(deleteProductRequest),

    fork(createExperienceRequest),
    fork(updateExperienceRequest),
    fork(deleteExperienceRequest),
    fork(getExperiencesRequest),

    fork(getUserAttributesRequest),
    fork(updateUserAttributesRequest),
    fork(updateUAExperienceSummaryRequest),
    fork(deleteUAExperienceSummaryRequest),

    fork(getGamePlatformsRequest),
    fork(addUpdateSocialRequest),
    fork(deleteSocialRequest),

    fork(addUserGameRequest),
    fork(updateUserGameRequest),
    fork(deleteUserGameRequest),

    fork(addUserGearRequest),
    fork(updateUserGearRequest),
    fork(deleteUserGearRequest),

    fork(loadPageRequest),
    fork(loadNextPage),
    fork(loadInitialPage),

    fork(unblockSuccess),

    fork(getPrivacyRequest),
    fork(updatePrivacyRequest),

    fork(getNowPlayingGameRequest),
    fork(updateNowPlayingGameRequest),
    fork(deleteNowPlayingGameRequest),
    fork(getOnlineStatusRequest),

    fork(acceptSquadRequest),
    fork(declineSquadRequest),
    fork(deleteSquadRequest),
    fork(getPendingSquadRequest),
    fork(getOutgoingSquadRequest),
  ]);
}
