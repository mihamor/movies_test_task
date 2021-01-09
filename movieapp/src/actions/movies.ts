import { AppState } from 'react-native';
import { ThunkAction } from 'redux-thunk';
import config from '_config/app';
import MoviesService from '_services/movies';
import { MovieRecord } from '_types/movie';
import {
  MoviesActionTypes,
  SET_MOVIES,
  SET_MOVIES_ERROR,
  START_MOVIES_LOADING,
  ADD_MOVIE,
  ADD_MOVIE_COMMIT,
  ADD_MOVIE_ROLLBACK,
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

export const addMovie = (
  movie: MovieRecord,
): MoviesActionTypes => ({
  type: ADD_MOVIE,
  payload: movie,
  meta: {
    offline: {
      effect: {
        url: `${config.apiUrl}/movies`,
        method: 'POST',
        body: JSON.stringify(movie),
      },
      commit: {
        type: ADD_MOVIE_COMMIT,
        meta: movie,
      },
      rollback: {
        type: ADD_MOVIE_ROLLBACK,
        meta: movie,
      },
    },
  },
});
  

