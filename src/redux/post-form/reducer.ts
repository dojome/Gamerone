import produce from 'immer';

import {
  ADD_IMAGE,
  EDIT_IMAGE,
  REMOVE_IMAGE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  INIT_FORM,
  PostFormState,
  PostFormActionTypes,
  SET_FORM,
  SAVE_TITLE,
} from './types';
import { INIT_STATE } from 'redux/types';

let POSTFORM_IMAGE_INDEX = 0;
export const increasePostImageIndex = () => {
  POSTFORM_IMAGE_INDEX += 1;
};
export const getPostImageIndex = () => {
  return POSTFORM_IMAGE_INDEX;
};

export const initState: PostFormState = {
  title: '',
  description: '',
  images: [],
  paths: {},
};

export default function miscReducer(
  state = initState,
  action: PostFormActionTypes,
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case INIT_STATE:
        Object.assign(draft, initState);
        break;

      case UPLOAD_IMAGE_REQUEST:
        break;

      case UPLOAD_IMAGE_SUCCESS: {
        const { id, response } = action.payload;
        draft.paths[id] = response;
        break;
      }

      case ADD_IMAGE:
        {
          const idx = draft.images.findIndex(
            (img) => img.originalBlob === action.payload.blobUrl,
          );
          if (idx < 0) {
            draft.images.push({
              id: action.payload.id,
              originalBlob: action.payload.blobUrl,
              croppedBlob: '',
            });
          }
        }
        break;

      case EDIT_IMAGE:
        {
          const { id, blobUrl } = action.payload;
          const idx = draft.images.findIndex((img) => img.id === id);

          if (idx >= 0) {
            draft.images[idx].croppedBlob = blobUrl;
          } else {
            console.log('EDIT_IMAGE', `image #${id} is not found`);
          }
        }
        break;

      case REMOVE_IMAGE:
        {
          const idx = draft.images.findIndex(
            (img) => img.id === action.payload,
          );
          draft.images.splice(idx, 1);

          if (action.payload in draft.paths) delete draft.paths[action.payload];
        }
        break;

      case INIT_FORM:
        draft.title = '';
        draft.description = '';
        draft.images = [];
        draft.paths = {};
        break;

      case SET_FORM:
        {
          // TODO: Scaling
          const { title, description } = action.payload;
          console.log('SET-FORM', title, description);
        }
        break;

      case SAVE_TITLE:
        draft.title = action.payload;
        break;

      default:
        break;
    }
  });
}
