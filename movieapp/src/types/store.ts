import { MovieRecord } from "./movie";

export type MovieQuery = {
  search: string,
  sorted: boolean,
};

export const START_MOVIES_LOADING = 'START_MOVIES_LOADING';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_MOVIES_ERROR = 'SET_MOVIES_ERROR';
export const FETCH_MOVIES = 'FETCH_MOVIES';

export interface StartMoviewLoadingAction {
  type: typeof START_MOVIES_LOADING,
  payload: MovieQuery,
}
export interface SetMoviesAction {
  type: typeof SET_MOVIES,
  payload: MovieRecord[],
}

export interface SetMoviesErrorAction {
  type: typeof SET_MOVIES_ERROR,
  payload: Error,
}
export interface FetchMoviesAction {
  type: typeof FETCH_MOVIES,
  payload: MovieQuery,
}

export type MoviesActionTypes = StartMoviewLoadingAction
| SetMoviesAction
| SetMoviesErrorAction
| FetchMoviesAction;

export type MoviesState = {
  query: MovieQuery,
  movies: {
    [key: string]:  MovieRecord,
  },
  error?: Error | null,
  loading: boolean,
};

export type AppState = {
  movies: MoviesState,
};
