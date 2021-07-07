import produce from 'immer';
import {
  LOAD_PAGE_REQUEST,
  LOAD_PAGE_SUCCESS,
  REMOVE_BLOCKED,
  GET_EXPERIENCES_SUCCESS,
  GET_PRIVACY_SUCCESS,
  UPDATE_PRIVACY_SUCCESS,
  LOAD_PROFILE_SUCCESS,
  UPDATE_SPONSORS,
  UPDATE_PRODUCTS,
  UPDATE_SOCIAL_NETWORKS,
  UPDATE_GAME_PLATFORMS,
  NOW_PLAYING_GAME,
  UPDATE_PROFILE_SUCCESS,
  SettingsState,
  SettingsActionTypes,
  UPDATE_USER_GEAR_SUCCESS,
  DELETE_USER_GEAR_SUCCESS,
  UPDATE_EXPERIENCES,
  UPDATE_LAYOUT_SETTINGS,
  ADD_USER_GEAR_SUCCESS,
  UPDATE_USER_GAME_SUCCESS,
  CREATE_USER_GAME_SUCCESS,
  DELETE_USER_GAME_SUCCESS,
  ACCEPT_SQUAD_SUCCESS,
  DECLINE_SQUAD_SUCCESS,
  GET_PENDING_SQUAD_SUCCESS,
  GET_OUTGOING_SQUAD_SUCCESS,
  GET_USER_ATTRIBUTES_SUCCESS,
  UPDATE_USER_ATTRIBUTES_SUCCESS,
  DELETE_USER_ATTRIBUTES_SUCCESS,
} from './types';
import { VisibilityEnum } from 'interfaces';
import { ProfileModel } from 'models/profile';
import { FOLLOW_SUCCESS, UNFOLLOW_SUCCESS } from 'redux/profile/types';
import { INIT_STATE } from 'redux/types';
import { NowPlayingModel } from 'models/NowPlayingModel';
import { UserAttributesModel } from 'models/UserAttributes';

export const initState: SettingsState = {
  profile: new ProfileModel(),
  privacy: {
    nameVisibility: VisibilityEnum.Public,
    postVisibility: VisibilityEnum.Public,
    gamertagVisibility: VisibilityEnum.Public,
  },

  pageData: {
    blocks: [],
    games: [],
    gears: [],
  },

  pageResponse: {
    blocks: null,
    games: null,
    gears: null,
  },

  experiences: [],
  gamePlatforms: [],
  squadPendingList: [],
  squadOutgoingList: [],
  userAttributes: new UserAttributesModel(),
};

export default function settingsReducer(
  state = initState,
  action: SettingsActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        Object.assign(draft, initState);
        break;

      // Profile
      case LOAD_PROFILE_SUCCESS:
        draft.profile = new ProfileModel().fromDto(action.payload);
        break;

      case UPDATE_PROFILE_SUCCESS:
        draft.profile = new ProfileModel().fromDto(
          (state.profile as ProfileModel).updateUser(action.payload),
        );
        break;

      // Pagination
      case LOAD_PAGE_REQUEST:
        break;

      case FOLLOW_SUCCESS:
        draft.profile = new ProfileModel().fromDto(
          (state.profile as ProfileModel).followed(),
        );
        break;

      case UNFOLLOW_SUCCESS:
        draft.profile = new ProfileModel().fromDto(
          (state.profile as ProfileModel).unfollowed(),
        );
        break;

      case LOAD_PAGE_SUCCESS:
        const { key, response } = action.payload;
        draft.pageData[key].push(...response.data);
        draft.pageResponse[key] = response;
        break;

      case GET_PRIVACY_SUCCESS:
      case UPDATE_PRIVACY_SUCCESS:
        draft.privacy = action.payload;
        break;

      // Unblock
      case REMOVE_BLOCKED:
        draft.pageData.blocks = draft.pageData.blocks.filter(
          (u) => u.id !== action.payload,
        );
        break;

      case GET_EXPERIENCES_SUCCESS:
        draft.experiences = action.payload;
        break;

      case UPDATE_EXPERIENCES:
        draft.experiences = action.payload;
        break;

      // Sponosrs
      case UPDATE_SPONSORS:
        draft.profile.sponsors = action.payload;
        break;

      // Products
      case UPDATE_PRODUCTS:
        draft.profile.products = action.payload;
        break;

      // Social Networks for profile
      case UPDATE_SOCIAL_NETWORKS:
        draft.profile.networks = action.payload;
        break;

      // User Games
      case CREATE_USER_GAME_SUCCESS:
        draft.pageData.games.push(action.payload);
        break;

      case UPDATE_USER_GAME_SUCCESS:
        {
          const idx = draft.pageData.games.findIndex(
            (game) => game.id === action.payload.id,
          );

          if (idx) draft.pageData.games[idx] = action.payload;
        }
        break;

      case DELETE_USER_GAME_SUCCESS:
        draft.pageData.games = draft.pageData.games.filter(
          (g) => g.id !== action.payload,
        );
        break;

      // GamePlatforms
      case UPDATE_GAME_PLATFORMS:
        draft.gamePlatforms = action.payload;
        break;

      // Now Playing Game
      case NOW_PLAYING_GAME:
        draft.profile.currentlyPlaying = new NowPlayingModel().fromDto(
          action.payload,
        );
        break;

      // Gears
      case ADD_USER_GEAR_SUCCESS:
        draft.pageData.gears.push(action.payload);
        break;

      case UPDATE_USER_GEAR_SUCCESS:
        {
          const idx = draft.pageData.gears.findIndex(
            (gear) => gear.id === action.payload.id,
          );

          if (idx) draft.pageData.gears[idx] = action.payload;
        }
        break;

      case DELETE_USER_GEAR_SUCCESS:
        draft.pageData.gears = draft.pageData.gears.filter(
          (g) => g.id !== action.payload,
        );
        break;

      // Layout Settings
      case UPDATE_LAYOUT_SETTINGS:
        draft.profile = new ProfileModel().fromDto(
          (state.profile as ProfileModel).updateLayoutSettings(action.payload),
        );
        break;

      // Squad
      case ACCEPT_SQUAD_SUCCESS:
      case DECLINE_SQUAD_SUCCESS:
        draft.squadPendingList = state.squadPendingList.filter(
          (sq) => sq.user.id !== action.payload,
        );
        break;

      case GET_PENDING_SQUAD_SUCCESS:
        draft.squadPendingList = action.payload;
        break;

      case GET_OUTGOING_SQUAD_SUCCESS:
        draft.squadOutgoingList = action.payload;
        break;

      case GET_USER_ATTRIBUTES_SUCCESS:
      case UPDATE_USER_ATTRIBUTES_SUCCESS:
      case DELETE_USER_ATTRIBUTES_SUCCESS:
        draft.userAttributes = action.payload;
        break;

      default:
        break;
    }
  });
}
