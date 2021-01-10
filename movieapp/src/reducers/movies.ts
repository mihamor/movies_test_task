import {
  MoviesState,
  MoviesActionTypes,
  SET_MOVIES,
  SET_MOVIES_ERROR,
  START_MOVIES_LOADING,
  ADD_MOVIE,
  ADD_MOVIE_COMMIT,
  ADD_MOVIE_ROLLBACK,
  DELETE_MOVIE,
  DELETE_MOVIE_COMMIT,
  DELETE_MOVIE_ROLLBACK,
} from '../types/store';

const initialState: MoviesState = {
  query: {
    search: '',
    sorted: false,
  },
  movies: {},
  loading: false,
  error: null,
};

const resultStorage = (
  state: MoviesState = initialState,
  action: MoviesActionTypes,
): MoviesState => {
  switch (action.type) {
    case START_MOVIES_LOADING:
      return {
        ...state,
        query: action.payload,
        error: null,
        loading: true,
      }
    case SET_MOVIES_ERROR:
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    case SET_MOVIES: {
      return {
        ...state,
        movies: action.payload.reduce((acc, movie) => ({
          ...acc,
          [movie._id]: movie,
        }), {}),
        error: null,
        loading: false,
      };
    }
    case ADD_MOVIE: {
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload._id]: action.payload,
        },
      };
    }
    case ADD_MOVIE_COMMIT: {
      // delete old predicted movie & add actual
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.meta._id]: null,
          ...( action.payload?.data ? {
            [action.payload.data._id]: action.payload.data,
          } : {}),
        },
        error: action.payload?.error,
      }
    }
    case ADD_MOVIE_ROLLBACK: {
      // delete predicted movie
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.meta._id]: null,
        },
        error: action.payload?.message,
      }
    }
    case DELETE_MOVIE: {
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload._id]: null,
        },
      };
    }
    case DELETE_MOVIE_ROLLBACK: {
      // restore movie back to state
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.meta._id]: action.meta,
        },
        error: action.payload?.message,
      }
    }
    default:
      return state;
  }
};

export default resultStorage;
