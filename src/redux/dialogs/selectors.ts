import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';
import { DialogTypeEnum } from './types';

export const selectDialog = (state: RootState) => state.Dialog || initState;

export const selectDialogVisibility = createSelector(
  selectDialog,
  (state) => state.visibility,
);

export const selectDialogProps = createSelector(
  selectDialog,
  (state) => state.props,
);

export const selectUserSettingsIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SETTINGS_USER],
);

// Post
export const selectCommentsDialogIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.COMMENTS],
);

export const selectNewPostDialogIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.NEW_POST],
);

// Game
export const selectGameSettingsDialogIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SETTINGS_GAME],
);

export const selectGameSettingsDialogProp = createSelector(
  selectDialogProps,
  (props) => props[DialogTypeEnum.SETTINGS_GAME],
);

export const selectUserGameFormIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.FORM_USER_GAME],
);

// Store / Product
export const selectStoreSettingsIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SETTINGS_STORE],
);

export const selectProductFormIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.FORM_PRODUCT],
);

// Gear
export const selectGearSettingsIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SETTINGS_GEAR],
);

export const selectGearFormIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.FORM_GEAR],
);

// Sponsor
export const selectSponsorSettingsIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SETTINGS_SPONSOR],
);
export const selectSponsorFormIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.FORM_SPONSOR],
);

// Share
export const selectShareDialogIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SHARE],
);

export const selectShareDialogProp = createSelector(
  selectDialogProps,
  (props) => props[DialogTypeEnum.SHARE],
);

// Experience Summary
export const selectExperienceSummarySettingsDialogIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SETTINGS_EXPERIENCE_SUMMARY],
);

export const selectExperienceSummarySettingsDialogProp = createSelector(
  selectDialogProps,
  (props) => props[DialogTypeEnum.SETTINGS_EXPERIENCE_SUMMARY],
);

// Experience
export const selectExperienceSettingsDialogIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.SETTINGS_EXPERIENCE],
);

export const selectExperienceSettingsDialogProp = createSelector(
  selectDialogProps,
  (props) => props[DialogTypeEnum.SETTINGS_EXPERIENCE],
);

// Media
export const selectMediaDialogIsOpen = createSelector(
  selectDialogVisibility,
  (visibility) => visibility[DialogTypeEnum.MEDIA],
);

export const selectMediaDialogProp = createSelector(
  selectDialogProps,
  (props) => props[DialogTypeEnum.MEDIA],
);
