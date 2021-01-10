import { MovieQuery } from "_types/store";

import config from '_config/app';
import { MovieConfig, MovieRecord } from "_types/movie";

class MoviesService {
  static async getMovies({ search, sorted }: MovieQuery) {
    const url = `${config.apiUrl}/movies?search=${search}&sorted=${sorted}`;
    const jsonRepsonse = await fetch(url).then((response) => response.json());
    const movies: MovieRecord[] = jsonRepsonse.data;
    return movies;
  }

  static async addMovie(movieConfig: MovieConfig) {
    const url = `${config.apiUrl}/movies`;
    const jsonRepsonse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieConfig)
    }).then((response) => response.json());
    const movieRecord: MovieRecord = jsonRepsonse.data;
    return movieRecord;
  }

  static async deleteMovie(movieId: string) {
    const url = `${config.apiUrl}/movies/${movieId}`;
    const jsonRepsonse = await fetch(url, {
      method: 'DELETE'
    }).then((response) => response.json());
    const movieRecord: MovieRecord = jsonRepsonse.data;
    return movieRecord;
  }

  static async importMovies(formData: FormData) {
    const url = `${config.apiUrl}/movies/import`;
    const jsonRepsonse = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => response.json());
    console.log(jsonRepsonse);
    const movieRecords: MovieRecord[] = jsonRepsonse.data;
    return {
      data: movieRecords,
      error: jsonRepsonse.error,
    };
  }
};

export default MoviesService;