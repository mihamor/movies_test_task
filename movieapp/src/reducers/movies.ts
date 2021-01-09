import {
  MoviesState,
  MoviesActionTypes,
  SET_MOVIES,
  SET_MOVIES_ERROR,
  START_MOVIES_LOADING,
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
        error: action.payload,
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
    default:
      return state;
  }
};

export default resultStorage;
