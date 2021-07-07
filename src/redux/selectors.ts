/**
 * Here comes the combined selectors from different states
 */

import { createSelector } from 'reselect';

import { selectCurrentUserId } from './auth/selectors';
import sort from 'fast-sort';

import {
  selectCurrentProfileUser,
  selectCurrentProfileNetworks,
  selectCurrentProfileSponsors,
  selectCurrentProfileProducts,
  selectCurrentProfileLayout,
  selectProfileGames,
  selectProfileGears,
  selectProfileNowPlaying,
  selectResolvedContent,
  selectResolvedContentId,
  selectProfileLatestAchievements,
  selectProfileGearsResponse,
  selectProfileExperience,
  selectProfileExperienceSummary,
} from './profile/selectors';

import {
  selectSettingsSponsors,
  selectSettingsProducts,
  selectSettingsProfileUser,
  selectProfileSocialNetworks,
  selectLayoutSettings,
  selectSettingsGames,
  selectSettingsGears,
  selectSettingsNowPlaying,
  selectSettingsGearsResponse,
  selectSettingsExperience,
  selectSettingsExperienceSummary,
} from './settings/selectors';

import { selectStatus } from './request-status/selectors';

import { DEFAULT_USER_VISIBILITY } from 'utils/constants';
import { NowPlayingModel } from 'models/NowPlayingModel';
import { selectFeed, selectFeedResponse } from './post/selectors';
import { FEED_DATA, LOAD_FEED_REQUEST } from './post/types';
import { PostModel } from 'models/post';
import { Achievement, Post } from 'interfaces';

/**
 * These selectors below are used to select states effectively based on the currently viewing profile.
 *
 * - If the user is on their OWN profile, they select data from `Settings` state
 * - Otherwise, they select data from `Profile` state
 *
 * Note: We initially started by having separate pages like Settings and Profile (hopefully they make sense what they were for), and now we incorporated Settings and Profile features into one page (although still WIP), but the separated logic behind will remain unchanged (or we will consider to update later)
 */

/**
 * determines whether the currently viewing profile is my profile or not
 */
export const selectIsSelfProfile = createSelector(
  [selectResolvedContentId, selectCurrentUserId],
  (resolvedId, authUserId) => resolvedId === authUserId,
);

export const selectProfileUser = createSelector(
  [selectCurrentProfileUser, selectSettingsProfileUser],
  (profileUser, settingsUser) =>
    settingsUser.id === profileUser?.id ? settingsUser : profileUser,
);

/**
 * resolves social networks to be shown on Profile page
 */
export const selectSocialNetworks = createSelector(
  [
    selectIsSelfProfile,
    selectProfileSocialNetworks,
    selectCurrentProfileNetworks,
  ],
  (isSelfProfile, settingsNetworks, profileNetworks) =>
    isSelfProfile ? settingsNetworks : profileNetworks,
);

/**
 * resolves sponsors to be shown on Profile page
 */
export const selectSponsors = createSelector(
  [selectIsSelfProfile, selectSettingsSponsors, selectCurrentProfileSponsors],
  (isSelfProfile, settingsSponsors, profileSponsors) =>
    isSelfProfile ? settingsSponsors : profileSponsors,
);

/**
 * resolves products to be shown on Profile page
 */
export const selectProducts = createSelector(
  [selectIsSelfProfile, selectSettingsProducts, selectCurrentProfileProducts],
  (isSelfProfile, settingsProducts, profileProducts) =>
    isSelfProfile ? settingsProducts : profileProducts,
);

/**
 * resolves profile layout to be shown on Profile page
 */
export const selectProfileLayout = createSelector(
  [selectIsSelfProfile, selectLayoutSettings, selectCurrentProfileLayout],
  (isSelfProfile, settingsLayout, profileLayout) => {
    const layout = isSelfProfile ? settingsLayout : profileLayout;
    if (layout && !layout.visibility)
      layout.visibility = DEFAULT_USER_VISIBILITY;
    return layout;
  },
);

/**
 * resolves games to be shown on Profile page
 */
export const selectGames = createSelector(
  [selectIsSelfProfile, selectSettingsGames, selectProfileGames],
  (isSelfProfile, settingsGames, profileGames) =>
    isSelfProfile ? settingsGames : profileGames,
);

export const selectGamesStatus = createSelector(
  [selectIsSelfProfile, selectStatus],
  (isSelf, status) =>
    status.get(`${isSelf ? 'settings' : 'profile'}/LOAD_PAGE_REQUEST/games`),
);

export const selectGamesResponse = createSelector(
  [
    selectIsSelfProfile,
    selectSettingsGearsResponse,
    selectProfileGearsResponse,
  ],
  (isOwner, settingsResponse, profileResponse) =>
    isOwner ? settingsResponse : profileResponse,
);

export const selectHasMoreGames = createSelector(
  selectGamesResponse,
  (response) => (response ? response.currentPage >= response.lastPage : false),
);

/**
 * resolves experiences to be shown on Experience page
 */
export const selectExperience = createSelector(
  [selectIsSelfProfile, selectSettingsExperience, selectProfileExperience],
  (isSelfProfile, settingsExperience, profileExperience) =>
    isSelfProfile ? settingsExperience : profileExperience,
);

export const selectExperienceStatus = createSelector(
  [selectIsSelfProfile, selectStatus],
  (isSelf, status) =>
    status.get(`${isSelf ? 'settings' : 'profile'}/GET_EXPERIENCES_REQUEST`),
);

export const selectExperienceSummary = createSelector(
  [
    selectIsSelfProfile,
    selectSettingsExperienceSummary,
    selectProfileExperienceSummary,
  ],
  (isSelfProfile, settingsExperienceSummary, profileExperienceSummary) =>
    isSelfProfile ? settingsExperienceSummary : profileExperienceSummary,
);

export const selectExperienceSummaryStatus = createSelector(
  [selectIsSelfProfile, selectStatus],
  (isSelf, status) =>
    status.get(
      `${
        isSelf
          ? 'settings/GET_USER_ATTRIBUTES_REQUEST'
          : 'profile/GET_EXPERIENCE_SUMMARY_REQUEST'
      }`,
    ),
);

/**
 * resolves gears to be shown on Profile page
 */
export const selectGears = createSelector(
  [selectIsSelfProfile, selectSettingsGears, selectProfileGears],
  (isSelfProfile, settingsGears, profileGears) =>
    isSelfProfile ? settingsGears : profileGears,
);

export const selectGearsStatus = createSelector(
  [selectIsSelfProfile, selectStatus],
  (isSelf, status) =>
    status.get(`${isSelf ? 'settings' : 'profile'}/LOAD_PAGE_REQUEST/gears`),
);

/**
 * resolves now playing data to be shown on Profile page
 */
export const selectNowPlaying = createSelector(
  [selectIsSelfProfile, selectSettingsNowPlaying, selectProfileNowPlaying],
  (isSelfProfile, settingsNowPlaying, profileNowPlaying) =>
    (isSelfProfile ? settingsNowPlaying : profileNowPlaying) ||
    new NowPlayingModel(),
);

/**
 * resolves now playing data to be shown on Profile page
 */
export const selectLatestAchievements = createSelector(
  [selectProfileLatestAchievements],
  (profileLatestAchievements) => {
    if (profileLatestAchievements) {
      return sort(profileLatestAchievements).desc((a: Achievement) => a.date);
    }
    return [];
  },
);

/**
 * Select resolved content type
 *
 * private | user | club | game
 */
export const selectResolvedContentType = createSelector(
  [selectIsSelfProfile, selectResolvedContent],
  (isSelf, content) =>
    (isSelf ? 'private' : content?.contentType || 'private') as FEED_DATA,
);

/**
 * Select currently viewing profile feed whether it's user, game, or club
 */
export const selectProfileFeed = createSelector(
  [selectFeed, selectResolvedContentType, selectResolvedContentId],
  (feedData, contentType, contentId) => {
    if (contentId in feedData[contentType]) {
      return sort([...feedData[contentType][contentId]]).desc(
        (p: Post) => p.createdAt,
      );
    }
    return contentType === 'private'
      ? sort([...feedData.private[0]]).desc((p: Post) => p.createdAt)
      : [];
  },
);

/**
 * Return the rest of the feed excluding the latest post
 */
export const selectProfileFeedRest = createSelector(selectProfileFeed, (feed) =>
  feed.slice(1),
);

export const selectHasMoreProfileFeed = createSelector(
  [selectFeedResponse, selectResolvedContentType, selectResolvedContentId],
  (feedResponse, contentType, contentId) => {
    if (contentId in feedResponse[contentType]) {
      return feedResponse[contentType][contentId]?.offset !== 0;
    }
    return contentType === 'private'
      ? feedResponse.private[0]?.offset !== 0
      : false;
  },
);

export const selectProfileFeedStatus = createSelector(
  [selectStatus, selectResolvedContentType],
  (status, contentType) => status.get(LOAD_FEED_REQUEST + '/' + contentType),
);

export const selectProfileLatestPost = createSelector(
  selectProfileFeed,
  (feed) => (feed.length > 0 ? (feed[0] as PostModel) : new PostModel()),
);
