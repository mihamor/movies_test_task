import { MovieQuery } from "_types/store";

import config from '_config/app';
import { MovieConfig, MovieRecord } from "_types/movie";

type JsonResponse = { data?: MovieRecord[], error?: string };

class MoviesService {
  static async getMovies({ search, sorted }: MovieQuery) {
    const url = `${config.apiUrl}/movies?search=${search}&sorted=${sorted}`;
    const jsonRepsonse: JsonResponse = await fetch(url).then((response) => response.json());
    return jsonRepsonse;
  }

  static async addMovie(movieConfig: MovieConfig) {
    const url = `${config.apiUrl}/movies`;
    const jsonRepsonse: JsonResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieConfig)
    }).then((response) => response.json());
    return jsonRepsonse;
  }

  static async deleteMovie(movieId: string) {
    const url = `${config.apiUrl}/movies/${movieId}`;
    const jsonRepsonse: JsonResponse = await fetch(url, {
      method: 'DELETE'
    }).then((response) => response.json());
    return jsonRepsonse;
  }

  static async importMovies(formData: FormData) {
    const url = `${config.apiUrl}/movies/import`;
    const jsonRepsonse: JsonResponse = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => response.json());
    return jsonRepsonse;
  }
};

export default MoviesService;