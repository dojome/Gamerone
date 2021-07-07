/**
 * Dialog Visibility
 */

export const OPEN_DIALOG = 'dialogs/OPEN_DIALOG';

export const CLOSE_DIALOG = 'dialogs/CLOSE_DIALOG';

export const TOGGLE_DIALOG = 'dialogs/TOGGLE_DIALOG';

export const SHOW_DIALOG = 'dialogs/SHOW_DIALOG';

export type DialogType =
  | 'share'
  | 'comments'
  | 'settings-store'
  | 'settings-sponsor'
  | 'settings-gear'
  | 'settings-user'
  | 'settings-game'
  | 'settings-experience'
  | 'settings-experience-summary'
  | 'form-product'
  | 'form-sponsor'
  | 'form-user-game'
  | 'form-gear'
  | 'new-post'
  | 'media';

export enum DialogTypeEnum {
  SHARE = 'share',
  COMMENTS = 'comments',
  SETTINGS_STORE = 'settings-store',
  SETTINGS_SPONSOR = 'settings-sponsor',
  SETTINGS_GEAR = 'settings-gear',
  SETTINGS_USER = 'settings-user',
  SETTINGS_GAME = 'settings-game',
  SETTINGS_EXPERIENCE = 'settings-experience',
  SETTINGS_EXPERIENCE_SUMMARY = 'settings-experience-summary',
  FORM_PRODUCT = 'form-product',
  FORM_SPONSOR = 'form-sponsor',
  FORM_USER_GAME = 'form-user-game',
  FORM_GEAR = 'form-gear',
  NEW_POST = 'new-post',
  MEDIA = 'media',
}

/**
 * Actions
 */
export interface OpenDialogAction {
  type: typeof OPEN_DIALOG;
  payload: DialogType;
}

export interface CloseDialogAction {
  type: typeof CLOSE_DIALOG;
  payload: DialogType;
}

export interface ToggleDialogAction {
  type: typeof TOGGLE_DIALOG;
  payload: DialogType;
}

export interface ShowDialogAction {
  type: typeof SHOW_DIALOG;
  payload: ShowDialogActionPayload;
}

interface ShowDialogActionPayload {
  name: DialogType;
  show: boolean;
  param?: any;
}

export interface DialogState {
  visibility: {
    [t in DialogType]: boolean;
  };
  props: {
    [t in DialogType]?: any;
  };
}

export type DialogActionTypes =
  | OpenDialogAction
  | CloseDialogAction
  | ShowDialogAction
  | ToggleDialogAction;
