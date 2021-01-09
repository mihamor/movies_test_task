import { AppState } from 'react-native';
import { ThunkAction } from 'redux-thunk';
import MoviesService from '_services/movies';
import { MovieRecord } from '_types/movie';
import {
  MoviesActionTypes,
  SET_MOVIES,
  SET_MOVIES_ERROR,
  START_MOVIES_LOADING,
  MovieQuery,
} from '_types/store';

export const setMovies = (
  movies: MovieRecord[],
): MoviesActionTypes => ({
  type: SET_MOVIES,
  payload: movies,
});

export const setMoviesError = (
  error: Error,
): MoviesActionTypes => ({
  type: SET_MOVIES_ERROR,
  payload: error,
});

export const startMoviesLoading = (
  query: MovieQuery,
): MoviesActionTypes => ({
  type: START_MOVIES_LOADING,
  payload: query,
});

export const fetchMovies = (
  query: MovieQuery,
): ThunkAction<void, AppState, unknown, MoviesActionTypes> => async dispatch => {
  try {
    dispatch(startMoviesLoading(query));
    const movies = await MoviesService.getMovies(query);
    dispatch(setMovies(movies));
  } catch (error) {
    dispatch(setMoviesError(error))
  }
}
  

