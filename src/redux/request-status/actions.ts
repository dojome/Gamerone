import {
  START_REQUEST,
  FINISH_REQUEST,
  StartRequestAction,
  FinishRequestAction,
  CleanStatusAction,
  CLEAN_STATUS,
} from './types';
import { Nullable } from 'interfaces';

export default {
  startRequest: (action: string): StartRequestAction => ({
    type: START_REQUEST,
    payload: action,
  }),
  finishRequest: (
    action: string,
    error: Nullable<Error> = null,
  ): FinishRequestAction => ({
    type: FINISH_REQUEST,
    payload: {
      name: action,
      error,
    },
  }),
  cleanStatus: (action: string): CleanStatusAction => ({
    type: CLEAN_STATUS,
    payload: action,
  }),
};
