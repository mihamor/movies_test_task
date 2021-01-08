import { MovieConfig } from "../types";

const nameKey = 'Title';
const yearKey = 'Release Year';
const formatKey = 'Format';
const actorsKey = 'Stars';

export default class MovieParser {

  static validateFormat(format: string) {
    return format === 'DVD'
    || format === 'VHS'
    || format === 'Blu-Ray';
  }

  static parse(fileContent: string): MovieConfig[] {
    const movieTextInfos = fileContent.split('\n\n');
    const movies = movieTextInfos.map((textInfo) => {
      const fields = textInfo.split('\n');
      const movieData = fields.reduce((acc, field) => {
        const [key, value] = field.split(':').map((val) => val.trim());
        return {
          ...acc,
          [key]: value,
        }
      }, { [nameKey]: null, [yearKey]: null,
        [formatKey]: null, [actorsKey]: null });
      const name = movieData[nameKey];
      const year = Number(movieData[yearKey]);
      const format = movieData[formatKey];
      const actors = movieData[actorsKey]?.split(',').map((str) => ({
        fullname: str.trim()
      }));
      if(!name || isNaN(year) || !this.validateFormat(format)) {
        throw new Error('Can\'t parse provided data');
      }
      return {
        name,
        year,
        format,
        actors,
      };
    });
    return movies;
  }
};