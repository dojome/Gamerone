import { Map } from 'immutable';
import {
  START_REQUEST,
  FINISH_REQUEST,
  RequestStatusState,
  RequestStatusActionTypes,
  CLEAN_STATUS,
} from './types';

import { RequestStatus } from 'models/common';
import { INIT_STATE } from 'redux/types';
import { ERROR_DEFAULT } from 'utils/messages';
import { Notify } from 'components/utility/Notify';
import { ValidationError } from 'interfaces';

export const initState: RequestStatusState = {
  status: Map<string, RequestStatus>(),
  progressingRequests: [],
};

export default function requestStatusReducer(
  state = initState,
  action: RequestStatusActionTypes,
) {
  switch (action.type) {
    case INIT_STATE:
      return {
        ...initState,
      };

    case START_REQUEST: {
      const { status, progressingRequests } = state;
      return {
        ...state,
        progressingRequests: [...progressingRequests, action.payload],
        status: status.set(
          action.payload,
          new RequestStatus({
            action: action.payload,
            isFetching: true,
            error: null,
          }),
        ),
      };
    }

    case FINISH_REQUEST: {
      const { name, error } = action.payload;
      const { status, progressingRequests } = state;
      const requestedStatus = status.get(name);

      if (error) {
        console.log(`FINISH_REQUEST : ${name} - error`, error);
        Notify.error(
          error.message || (error as ValidationError).msg || ERROR_DEFAULT,
        );
      }
      if (requestedStatus) {
        return {
          ...state,
          progressingRequests: progressingRequests.filter((f) => f !== name),
          status: status.set(
            name,
            new RequestStatus({
              action: name,
              isFetching: false,
              error,
            }),
          ),
        };
      } else {
        throw new Error(`${name} has not started`);
      }
    }

    case CLEAN_STATUS: {
      const name = action.payload;
      const { status } = state;
      const requestedStatus = status.get(name);
      if (requestedStatus) {
        return {
          ...state,
          status: status.set(
            name,
            new RequestStatus(requestedStatus).setError(null),
          ),
        };
      } else {
        console.log(`${name} is not requested yet`);
      }
      break;
    }

    default:
      break;
  }

  return state;
}
