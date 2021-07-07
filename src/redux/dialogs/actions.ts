import {
  DialogType,
  OpenDialogAction,
  OPEN_DIALOG,
  CloseDialogAction,
  CLOSE_DIALOG,
  ToggleDialogAction,
  TOGGLE_DIALOG,
  ShowDialogAction,
  SHOW_DIALOG,
} from './types';

export default {
  // Visibility
  openDialog: (payload: DialogType): OpenDialogAction => ({
    type: OPEN_DIALOG,
    payload,
  }),

  closeDialog: (payload: DialogType): CloseDialogAction => ({
    type: CLOSE_DIALOG,
    payload,
  }),

  toggleDialog: (payload: DialogType): ToggleDialogAction => ({
    type: TOGGLE_DIALOG,
    payload,
  }),

  showDialog: (
    name: DialogType,
    show: boolean,
    param?: any,
  ): ShowDialogAction => ({
    type: SHOW_DIALOG,
    payload: {
      name,
      show,
      param,
    },
  }),
};
