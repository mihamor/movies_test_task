import { createSelector } from 'reselect';
import { AppState } from '_types/store';

export const moviesStateSelector = (state: AppState) => state.movies;
export const moviesSelector = createSelector(
  moviesStateSelector,
  (moviesState) => Object.values(moviesState.movies),
);
