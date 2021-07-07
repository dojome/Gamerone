import { UploadRequest, InlineResponse200, PostRequest } from 'interfaces';
import { RootStateActions } from 'redux/types';

/**
 * Images
 */
export const ADD_IMAGE = 'post-form/ADD_IMAGE';
export const AUTO_IMAGE_CROPPED = 'post-form/AUTO_IMAGE_CROPPED';
export const EDIT_IMAGE = 'post-form/EDIT_IMAGE';
export const REMOVE_IMAGE = 'post-form/REMOVE_IMAGE'; // remove from UI
export const DELETE_IMAGE = 'post-form/DELETE_IMAGE'; // delete from CDN
export const UPLOAD_IMAGE_REQUEST = 'post-form/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'post-form/UPLOAD_IMAGE_SUCCESS';

/**
 * FORM
 */
export const INIT_FORM = 'post-form/INIT_FORM';
export const SET_FORM = 'post-form/SET_FORM';

export const SAVE_TITLE = 'post-form/SAVE_TITLE';

// State
export interface PostFormState {
  // title and description are not used yet
  title: string;
  description: string;
  images: PostFormImage[];
  paths: { [t: number]: InlineResponse200 };
}

export interface PostFormImage {
  id: number;
  originalBlob: string;
  croppedBlob: string;
}

// Actions
export interface CleanFormAction {
  type: typeof INIT_FORM;
}

export interface AddImageAction {
  type: typeof ADD_IMAGE;
  payload: AddImageActionPayload;
}

export interface AddImageActionPayload {
  id: number;
  blobUrl: string;
}

export interface EditImageAction {
  type: typeof EDIT_IMAGE;
  payload: EditImageActionPayload;
}

export interface EditImageActionPayload {
  id: number;
  blobUrl: string;
}

export interface RemoveImageAction {
  type: typeof REMOVE_IMAGE;
  payload: number;
}

export interface DeleteImageAction {
  type: typeof DELETE_IMAGE;
  payload: number;
}

export interface UploadImageAction {
  type: typeof UPLOAD_IMAGE_REQUEST;
  payload: UploadImageActionPayload;
}

export interface UploadImageActionPayload {
  id: number;
  request: UploadRequest;
}

export interface UploadImageSuccess {
  type: typeof UPLOAD_IMAGE_SUCCESS;
  payload: UploadImageSuccessPayload;
}

export interface UploadImageSuccessPayload {
  id: number;
  response: InlineResponse200;
}

export interface SetFormAction {
  type: typeof SET_FORM;
  payload: PostRequest;
}

export interface SaveTitleAction {
  type: typeof SAVE_TITLE;
  payload: string;
}

export type PostFormActionTypes =
  // inherited actions
  | RootStateActions
  // post form actions
  | AddImageAction
  | EditImageAction
  | RemoveImageAction
  | UploadImageAction
  | UploadImageSuccess
  | DeleteImageAction
  | CleanFormAction
  | SetFormAction
  | SaveTitleAction;
