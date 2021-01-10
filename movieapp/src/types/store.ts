import { MovieRecord } from "./movie";

export type MovieQuery = {
  search: string,
  sorted: boolean,
};

export const START_MOVIES_LOADING = 'START_MOVIES_LOADING';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_MOVIES_ERROR = 'SET_MOVIES_ERROR';

export const ADD_MOVIE = 'ADD_MOVIE';
export const ADD_MOVIE_COMMIT = 'ADD_MOVIE_COMMIT';
export const ADD_MOVIE_ROLLBACK = 'ADD_MOVIE_ROLLBACK';

export const DELETE_MOVIE = 'DELETE_MOVIE';
export const DELETE_MOVIE_COMMIT = 'DELETE_MOVIE_COMMIT';
export const DELETE_MOVIE_ROLLBACK = 'DELETE_MOVIE_ROLLBACK';

export interface StartMoviewLoadingAction {
  type: typeof START_MOVIES_LOADING,
  payload: MovieQuery,
};

export interface SetMoviesAction {
  type: typeof SET_MOVIES,
  payload: MovieRecord[],
};

export interface SetMoviesErrorAction {
  type: typeof SET_MOVIES_ERROR,
  payload: Error,
};

export interface AddMovieCommitAction {
  type: typeof ADD_MOVIE_COMMIT,
  payload?: { data: MovieRecord }, 
  meta: MovieRecord,
};

export interface AddMovieRollbackAction {
  type: typeof ADD_MOVIE_ROLLBACK,
  meta: MovieRecord,
};

export interface AddMovieAction {
  type: typeof ADD_MOVIE,
  payload: MovieRecord,
  meta: {
    offline: {
      effect: {
        url: string,
        method: 'POST',
        body: string,
      },
      commit: AddMovieCommitAction,
      rollback: AddMovieRollbackAction,
    },
  }
};

export interface DeleteMovieCommitAction {
  type: typeof DELETE_MOVIE_COMMIT,
  payload?: { data: MovieRecord }, 
  meta: MovieRecord,
};

export interface DeleteMovieRollbackAction {
  type: typeof DELETE_MOVIE_ROLLBACK,
  meta: MovieRecord,
};

export interface DeleteMovieAction {
  type: typeof DELETE_MOVIE,
  payload: MovieRecord,
  meta: {
    offline: {
      effect: {
        url: string,
        method: 'DELETE',
      },
      commit: DeleteMovieCommitAction,
      rollback: DeleteMovieRollbackAction,
    },
  }
};

export type MoviesActionTypes = StartMoviewLoadingAction
| SetMoviesAction
| SetMoviesErrorAction
| AddMovieAction
| AddMovieCommitAction
| AddMovieRollbackAction
| DeleteMovieAction
| DeleteMovieCommitAction
| DeleteMovieRollbackAction;

export type MoviesState = {
  query: MovieQuery,
  movies: {
    [key: string]:  MovieRecord | null,
  },
  error?: Error | null,
  loading: boolean,
};

export type AppState = {
  movies: MoviesState,
};
