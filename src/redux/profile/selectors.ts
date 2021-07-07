import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';
import {
  UserGear,
  UserGame,
  SocialNetwork,
  User,
  SquadList,
  UserExperience,
} from 'interfaces';
import sort from 'fast-sort';

const selectGlobal = (state: RootState) => state.Profile || initState;

export const selectProfiles = createSelector(
  selectGlobal,
  (state) => state.profiles || [],
);

/**
 * Profile
 */
export const selectCurrentProfile = createSelector(
  selectGlobal,
  (state) => state.profile,
);

export const selectResolvedContent = createSelector(
  selectGlobal,
  (state) => state.resolvedContent,
);

export const selectResolvedContentId = createSelector(
  selectGlobal,
  (state) => state.resolvedContent?.contentId || 0,
);

export const selectCurrentProfileUser = createSelector(
  [selectCurrentProfile, selectResolvedContent],
  (profile, route) => (profile ? profile.user : route?.content),
);

export const selectCurrentProfileId = selectResolvedContentId;

/**
 * Profile data
 */
export const selectCurrentProfileNetworks = createSelector(
  selectCurrentProfile,
  (profile) => profile?.networks || ([] as SocialNetwork[]),
);

export const selectCurrentProfileSponsors = createSelector(
  selectCurrentProfile,
  (profile) => profile?.sponsors,
);

export const selectCurrentProfileProducts = createSelector(
  selectCurrentProfile,
  (profile) => profile?.products,
);

export const selectProfileLatestAchievements = createSelector(
  selectCurrentProfile,
  (profile) => profile?.achievements,
);

export const selectProfileNowPlaying = createSelector(
  selectCurrentProfile,
  (profile) => profile?.currentlyPlaying,
);

/**
 * Profile: Experience
 */
export const selectProfileExperience = createSelector(selectGlobal, (state) =>
  sort([...state.experiences]).desc((ue: UserExperience) => ue.startDate),
);

/**
 * Returns UserExperienceSummaryObject
 */
export const selectProfileExperienceSummary = createSelector(
  selectGlobal,
  (state) => state.experienceSummary?.experienceSummary,
);

/**
 * Layout
 */
export const selectCurrentProfileLayout = (state: RootState) =>
  state.Profile.profile?.layout;

export const selectProfileLayoutTemp = (state: RootState) =>
  state.Profile.layout;

export const selectProfileLayoutProcess = createSelector(
  selectGlobal,
  (state) => state.layoutProcess,
);

/**
 * Pagination - Games
 */
export const selectProfileGames = createSelector(selectGlobal, (state) =>
  sort([...state.pageData.games]).asc((ug: UserGame) => ug.game.name),
);

export const selectProfileGears = createSelector(selectGlobal, (state) =>
  sort([...state.pageData.gears]).asc((ug: UserGear) => ug.gear.name),
);

export const selectProfileFollowers = createSelector(selectGlobal, (state) =>
  sort([...state.pageData.followers]).asc((u: User) => u.username),
);

export const selectProfileFollowings = createSelector(selectGlobal, (state) =>
  sort([...state.pageData.followings]).asc((u: User) => u.username),
);

export const selectFollowersResponses = createSelector(
  selectGlobal,
  (state) => state.pageResponse.followers,
);

export const selectFollowingsResponses = createSelector(
  selectGlobal,
  (state) => state.pageResponse.followings,
);

export const selectProfileGamesResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.games,
);

export const selectProfileGearsResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.gears,
);

export const selectIsLastFollowers = createSelector(
  selectFollowersResponses,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);

export const selectIsLastFollowings = createSelector(
  selectFollowingsResponses,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);

/**
 * Squad
 */
export const selectProfileSquad = createSelector(selectGlobal, (state) =>
  sort([...state.squad]).asc((sl: SquadList) => sl.friend.username),
);
