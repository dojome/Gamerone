import produce from 'immer';
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  SET_CURRENT_PROFILE,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  SET_RESOLVED_CONTENT,
  ProfileActionTypes,
  ProfileState,
  GET_PROFILE_LAYOUT_SUCCESS,
  PROFILE_LAYOUT_PROCESS,
  LOAD_PAGE_SUCCESS,
  ProfileLayoutProcessTypeEnum,
  PROFILE_LAYOUT_TEMP,
  GET_SQUAD_SUCCESS,
  ADD_SQUAD_SUCCESS,
  LOAD_INITIAL_PAGE,
  REMOVE_FOLLOWING,
  REMOVE_FOLLOWER,
  ADD_FOLLOWER,
  ADD_FOLLOWING,
  GET_EXPERIENCES_SUCCESS,
  GET_EXPERIENCE_SUMMARY_SUCCESS,
} from './types';
import { ProfileModel } from 'models/profile';
import { RouteModel } from 'models/route';
// import { LayoutSettingsModel } from 'models/LayoutSettingModel';
import { INIT_STATE } from 'redux/types';
import { UserModel } from 'models/user';
import { User, UserGear, UserGame } from 'interfaces';

export const initState: ProfileState = {
  profiles: [],
  profile: null,
  resolvedContent: null,
  layout: { settings: null, visibility: null },
  layoutProcess: ProfileLayoutProcessTypeEnum.Initial,

  pageData: { games: [], gears: [], followers: [], followings: [] },

  pageResponse: {
    games: null,
    gears: null,
    followers: null,
    followings: null,
  },

  squad: [],
  experienceSummary: null,
  experiences: [],
};

export default function profileReducer(
  state = initState,
  action: ProfileActionTypes,
) {
  return produce<ProfileState>(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        Object.assign(draft, initState);
        break;

      case GET_PROFILE_SUCCESS: {
        // TODO: Implement dictionary based cache
        // draft.profiles.push(new ProfileModel().fromDto(action.payload));

        draft.profile = new ProfileModel().fromDto(action.payload);
        break;
      }

      case GET_PROFILE_ERROR:
        draft.profile = null;
        break;

      case SET_RESOLVED_CONTENT:
        draft.resolvedContent = new RouteModel().fromDto(action.payload);
        break;

      case SET_CURRENT_PROFILE:
        draft.profile = action.payload
          ? new ProfileModel().fromDto(action.payload)
          : null;
        break;

      // Follow,
      case FOLLOW_SUCCESS: {
        if (state.profile) {
          draft.profile = new ProfileModel().fromDto(state.profile.follow());
        }

        // Update in followers list
        let idx = state.pageData.followers.findIndex(
          (u) => u.id === action.payload,
        );

        if (idx >= 0) {
          draft.pageData.followers[idx] = new UserModel()
            .fromDto(state.pageData.followers[idx])
            .follow();
        }

        // Update in followings list
        idx = state.pageData.followings.findIndex(
          (u) => u.id === action.payload,
        );

        if (idx >= 0) {
          draft.pageData.followings[idx] = new UserModel()
            .fromDto(state.pageData.followings[idx])
            .follow();
        }
        break;
      }

      case ADD_FOLLOWER:
        draft.pageData.followers.push(action.payload);
        break;

      case ADD_FOLLOWING:
        draft.pageData.followings.push(action.payload);
        break;

      // Unfollow
      case UNFOLLOW_SUCCESS:
        if (state.profile) {
          draft.profile = new ProfileModel().fromDto(state.profile.unfollow());
        }
        break;

      case REMOVE_FOLLOWING:
        draft.pageData.followings = draft.pageData.followings.filter(
          (u) => u.id !== action.payload,
        );
        break;

      case REMOVE_FOLLOWER:
        draft.pageData.followers = draft.pageData.followers.filter(
          (u) => u.id !== action.payload,
        );
        break;

      case GET_PROFILE_LAYOUT_SUCCESS:
        if (state.profile) {
          draft.profile = new ProfileModel().fromDto(
            (state.profile as ProfileModel).updateLayoutSettings(
              action.payload,
            ),
          );
        }
        break;

      case PROFILE_LAYOUT_TEMP:
        draft.layout = action.payload;
        break;

      case PROFILE_LAYOUT_PROCESS:
        draft.layoutProcess = action.payload;
        break;

      // pagination
      case LOAD_INITIAL_PAGE:
        draft.pageData[action.payload] = [];
        draft.pageResponse[action.payload] = null;
        break;

      case LOAD_PAGE_SUCCESS:
        {
          const { key, response } = action.payload;

          draft.pageResponse[key] = response;

          if (key === 'gears')
            draft.pageData.gears = response.data as UserGear[];
          else if (key === 'games')
            draft.pageData.games = response.data as UserGame[];
          else {
            draft.pageData[key] = response.data as User[];
          }
        }
        break;

      // squad
      case GET_SQUAD_SUCCESS:
        draft.squad = action.payload;
        break;

      case ADD_SQUAD_SUCCESS:
        break;

      // experiences
      case GET_EXPERIENCES_SUCCESS:
        draft.experiences = action.payload;
        break;

      case GET_EXPERIENCE_SUMMARY_SUCCESS:
        draft.experienceSummary = action.payload;
        break;

      default:
        break;
    }
  });
}
