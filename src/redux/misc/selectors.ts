import { createSelector } from 'reselect';
import { RootState } from '../types';
import { initState } from './reducer';

export const selectGlobal = (state: RootState) => state.Misc || initState;

export const selectNotifications = createSelector(
  selectGlobal,
  (state) => state.notifications,
);
