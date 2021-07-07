import produce from 'immer';
import {
  DialogState,
  DialogActionTypes,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  TOGGLE_DIALOG,
  SHOW_DIALOG,
} from './types';

export const initState: DialogState = {
  visibility: {
    share: false,
    comments: false,
    'settings-store': false,
    'settings-sponsor': false,
    'settings-gear': false,
    'settings-game': false,
    'settings-user': false,
    'settings-experience': false,
    'settings-experience-summary': false,
    'form-sponsor': false,
    'form-product': false,
    'form-gear': false,
    'form-user-game': false,
    'new-post': false,
    media: false,
  },
  props: {},
};

export default function dialogReducer(
  state = initState,
  action: DialogActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case OPEN_DIALOG:
        draft.visibility[action.payload] = true;
        break;

      case CLOSE_DIALOG:
        draft.visibility[action.payload] = false;
        break;

      case TOGGLE_DIALOG:
        draft.visibility[action.payload] = !state.visibility[action.payload];
        break;

      case SHOW_DIALOG:
        draft.visibility[action.payload.name] = action.payload.show;
        draft.props[action.payload.name] = action.payload.param;
        break;

      default:
        break;
    }
  });
}
