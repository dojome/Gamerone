import { createSelector } from 'reselect';
import { initState } from './reducer';
import { RootState } from '../types';

import {
  User,
  UserGame,
  UserGear,
  GamePlatform,
  UserExperience,
} from 'interfaces';
import { GamePlatformModel } from 'models/GamePlatformModel';
import { NowPlayingModel } from 'models/NowPlayingModel';
import sort from 'fast-sort';

export const selectGlobal = (state: RootState) => state.Settings || initState;

const sortByOrdinal = (a: GamePlatform, b: GamePlatform) =>
  (a as GamePlatformModel).ordinal - (b as GamePlatformModel).ordinal;

/**
 * Pagination - followers, followings, blocks, games, gears
 */

export const selectSettingsBlocks = createSelector(selectGlobal, (state) =>
  sort([...(state.pageData.blocks as User[])]).asc((u: User) => u.username),
);

export const selectGamePlatforms = createSelector(selectGlobal, (state) =>
  [...state.gamePlatforms].sort(sortByOrdinal),
);

export const selectSettingsGames = createSelector(selectGlobal, (state) =>
  sort([...(state.pageData.games as UserGame[])]).asc(
    (ug: UserGame) => ug.game.name,
  ),
);

export const selectSettingsGears = createSelector(selectGlobal, (state) =>
  sort([...(state.pageData.gears as UserGear[])]).asc(
    (ug: UserGear) => ug.gear.name,
  ),
);

const selectSettingsBlocksResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.blocks,
);

export const selectSettingsGamesResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.games,
);

export const selectSettingsGearsResponse = createSelector(
  selectGlobal,
  (state) => state.pageResponse.gears,
);

export const selectIsLastBlocks = createSelector(
  selectSettingsBlocksResponse,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);

/**
 * Privacy
 */
export const selectUserPrivacy = createSelector(
  selectGlobal,
  (state) => state.privacy,
);

/**
 * Profile
 */
export const selectSettingsProfile = createSelector(
  selectGlobal,
  (state) => state.profile,
);

export const selectSettingsProfileUser = createSelector(
  selectGlobal,
  (state) => state.profile.user,
);

/**
 * User Attributes
 */
export const selectUserAttributes = createSelector(
  selectGlobal,
  (state) => state.userAttributes,
);

/**
 * Returns a string of the experience summary
 */
export const selectSettingsExperienceSummary = createSelector(
  selectGlobal,
  (state) => state.userAttributes.experienceSummary,
);

// export const selectSettingsSocialNetworks = createSelector(
//   selectGlobal,
//   (state) => state.socials as SocialNetwork[],
// );

// export const selectSettingsExperience = createSelector(
//   selectGlobal,
//   (state) => state.experiences as UserExperience[],
// );

export const selectSettingsExperience = createSelector(selectGlobal, (state) =>
  sort([...(state.experiences as UserExperience[])]).desc(
    (e: UserExperience) => e.startDate,
  ),
);

export const selectSettingsSponsors = (state: RootState) =>
  state.Settings.profile.sponsors;

export const selectSettingsProducts = (state: RootState) =>
  state.Settings.profile.products;

export const selectProfileSocialNetworks = (state: RootState) =>
  state.Settings.profile.networks;

export const selectLayoutSettings = (state: RootState) =>
  state.Settings.profile.layout;

export const selectSettingsNowPlaying = (state: RootState) =>
  state.Settings.profile.currentlyPlaying as NowPlayingModel;

// Squad
export const selectSettingsPendingSquad = createSelector(
  selectGlobal,
  (state) => state.squadPendingList,
);

export const selectSettingsOutgoingSquad = createSelector(
  selectGlobal,
  (state) => state.squadOutgoingList,
);
