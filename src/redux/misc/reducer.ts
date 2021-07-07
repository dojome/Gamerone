import produce from 'immer';

import { MiscState, MiscActionTypes, UPDATE_NOTIFICATIONS } from './types';
import { NotificationModel } from 'models/NotificationModel';

export const initState: MiscState = {
  notifications: [],
};

export default function miscReducer(
  state = initState,
  action: MiscActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_NOTIFICATIONS:
        draft.notifications = action.payload
          .filter((notification) => notification.readAt === null)
          .map((notification) => new NotificationModel().fromDTO(notification));
        break;

      default:
        break;
    }
  });
}
