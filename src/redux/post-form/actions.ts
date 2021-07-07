import {
  UPLOAD_IMAGE_REQUEST,
  DELETE_IMAGE,
  ADD_IMAGE,
  REMOVE_IMAGE,
  EDIT_IMAGE,
  INIT_FORM,
  SET_FORM,
  UploadImageAction,
  AddImageAction,
  RemoveImageAction,
  EditImageAction,
  DeleteImageAction,
  SAVE_TITLE,
} from './types';
import { increasePostImageIndex, getPostImageIndex } from './reducer';
import { PostRequest } from 'interfaces';

export default {
  // file
  uploadImage: (id: number, f: File, path: string): UploadImageAction => ({
    type: UPLOAD_IMAGE_REQUEST,
    payload: {
      id,
      request: {
        f,
        path,
      },
    },
  }),

  addImage: (blobUrl: string): AddImageAction => {
    increasePostImageIndex();
    return {
      type: ADD_IMAGE,
      payload: {
        id: getPostImageIndex(),
        blobUrl,
      },
    };
  },

  deleteImage: (id: number): DeleteImageAction => ({
    type: DELETE_IMAGE,
    payload: id,
  }),

  removeImage: (id: number): RemoveImageAction => ({
    type: REMOVE_IMAGE,
    payload: id,
  }),

  editImage: (id: number, blobUrl: string): EditImageAction => ({
    type: EDIT_IMAGE,
    payload: {
      id,
      blobUrl,
    },
  }),

  initForm: () => ({
    type: INIT_FORM,
  }),

  setForm: (request: PostRequest) => ({
    type: SET_FORM,
    payload: request,
  }),

  saveTitle: (title: string) => ({
    type: SAVE_TITLE,
    payload: title,
  }),
};
