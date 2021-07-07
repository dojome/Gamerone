import { Map } from 'immutable';

import { Nullable } from 'interfaces';
import { RequestStatus } from 'models/common';
import { RootStateActions } from 'redux/types';

/**
 * General
 */
export const START_REQUEST = 'status/START_REQUEST';
export const FINISH_REQUEST = 'status/FINISH_REQUEST';
export const CLEAN_STATUS = 'status/CLEAN_STATUS';

/**
 * Actions
 */

export interface CleanStatusAction {
  type: typeof CLEAN_STATUS;
  payload: string;
}

export interface StartRequestAction {
  type: typeof START_REQUEST;
  payload: string;
}

export interface FinishRequestAction {
  type: typeof FINISH_REQUEST;
  payload: FinishRequestPayload;
}

export interface FinishRequestPayload {
  name: string;
  error: Nullable<Error>;
}

export interface RequestStatusState {
  status: Map<string, RequestStatus>;
  progressingRequests: Array<string>;
}

export type RequestStatusActionTypes =
  // inherited actions
  | RootStateActions
  // request status actions
  | StartRequestAction
  | FinishRequestAction
  | CleanStatusAction;
