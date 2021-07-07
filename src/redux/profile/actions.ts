import {
  GET_PROFILE_REQUEST,
  SET_CURRENT_PROFILE,
  FOLLOW_REQUEST,
  BLOCK_REQUEST,
  UNBLOCK_REQUEST,
  UNFOLLOW_REQUEST,
  SET_RESOLVED_CONTENT,
  MULTI_FOLLOW_REQUEST,
  SET_CURRENT_PROFILE_LAYOUT_REQUEST,
  GET_PROFILE_LAYOUT_REQUEST,
  PROFILE_LAYOUT_PROCESS,
  LoadPageActionPayload,
  LOAD_PAGE_REQUEST,
  PAGE_DATA,
  LoadNextPageAction,
  LOAD_NEXT_PAGE,
  LoadInitialPageAction,
  LOAD_INITIAL_PAGE,
  ProfileLayoutProcessTypeEnum,
  PROFILE_LAYOUT_TEMP,
  GetSquadAction,
  GET_SQUAD_REQUEST,
  UpdateSquadAction,
  UPDATE_SQUAD,
  ADD_SQUAD_REQUEST,
  AddSquadAction,
  GET_EXPERIENCES_REQUEST,
  GET_EXPERIENCE_SUMMARY_REQUEST,
} from './types';

import {
  Route,
  Profile,
  Nullable,
  MultiFollowRequest,
  LayoutSettings,
  SquadList,
} from 'interfaces';

export default {
  getProfile: (userid: number) => ({
    type: GET_PROFILE_REQUEST,
    payload: userid,
  }),

  setCurrentProfile: (profile: Nullable<Profile>) => ({
    type: SET_CURRENT_PROFILE,
    payload: profile,
  }),

  // Profile layout
  getProfileLayout: () => ({
    type: GET_PROFILE_LAYOUT_REQUEST,
  }),

  setCurrentProfileLayout: (profileLayout: LayoutSettings) => ({
    type: SET_CURRENT_PROFILE_LAYOUT_REQUEST,
    payload: profileLayout,
  }),

  getProfileLayoutProcess: (
    profileLayoutProcess: ProfileLayoutProcessTypeEnum,
  ) => ({
    type: PROFILE_LAYOUT_PROCESS,
    payload: profileLayoutProcess,
  }),

  getProfileLayoutTemp: (payload: LayoutSettings) => ({
    type: PROFILE_LAYOUT_TEMP,
    payload,
  }),

  setResolvedContent: (content: Nullable<Route>) => ({
    type: SET_RESOLVED_CONTENT,
    payload: content,
  }),

  // follow & block
  follow: (userid?: number) => ({
    type: FOLLOW_REQUEST,
    payload: userid,
  }),
  unfollow: (userid?: number) => ({
    type: UNFOLLOW_REQUEST,
    payload: userid,
  }),
  unblock: (userid?: number) => ({
    type: UNBLOCK_REQUEST,
    payload: userid,
  }),
  block: (userid?: number) => ({
    type: BLOCK_REQUEST,
    payload: userid,
  }),

  multiFollow: (payload: MultiFollowRequest) => ({
    type: MULTI_FOLLOW_REQUEST,
    payload,
  }),

  // pagination
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

  // squad
  addSquad: (userId?: number): AddSquadAction => ({
    type: ADD_SQUAD_REQUEST,
    payload: userId,
  }),

  getSquad: (userId?: number): GetSquadAction => ({
    type: GET_SQUAD_REQUEST,
    payload: userId,
  }),

  updateSquad: (payload: SquadList[]): UpdateSquadAction => ({
    type: UPDATE_SQUAD,
    payload,
  }),

  // experiences
  getExperiences: (userid: number) => ({
    type: GET_EXPERIENCES_REQUEST,
    payload: userid,
  }),

  getExperienceSummary: (userid: number) => ({
    type: GET_EXPERIENCE_SUMMARY_REQUEST,
    payload: userid,
  }),
};
