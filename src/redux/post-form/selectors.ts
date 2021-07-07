import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';

const selectGlobal = (state: RootState) => state.PostForm || initState;

export const selectImages = createSelector(
  selectGlobal,
  (state) => state.images,
);

export const selectImagePaths = createSelector(
  selectGlobal,
  (state) => state.paths,
);

export const selectImagesCount = createSelector(
  selectImages,
  (images) => images.length,
);

export const selectLastImageId = createSelector(
  selectImages,
  (images) => images[images.length - 1].id,
);

export const selectPostFormTitle = createSelector(
  selectGlobal,
  (state) => state.title,
);
