import { MovieQuery } from "_types/store";

import config from '_config/app';
import { MovieRecord } from "_types/movie";

class MoviesService {
  static async getMovies({ search, sorted }: MovieQuery) {
    const url = `${config.apiUrl}/movies?search=${search}&sorted=${sorted}`;
    console.log(url)
    const jsonRepsonse = await fetch(url).then((response) => response.json());
    const movies: MovieRecord[] = jsonRepsonse.data;
    return movies;
  }
};

export default MoviesService;