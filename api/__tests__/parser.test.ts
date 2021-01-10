import MovieParser from '../src/services/MovieParser';
import { MovieConfig } from '../src/types';


describe('parser service', () => {

  const validMultipleMoviesStr = `
Title: Cool Hand Luke
Release Year: 1967
Format: VHS
Stars: Paul Newman

Title: Butch Cassidy and the Sundance Kid
Release Year: 1969
Format: VHS
Stars: Paul Newman, Robert Redford
`;

  it('parse multiple valid movies', () => {
    const expectedMovies = [
      {
        name: 'Cool Hand Luke',
        year: 1967,
        format: 'VHS',
        actors: [
          { fullname: 'Paul Newman' },
        ],
      },
      {
        name: 'Butch Cassidy and the Sundance Kid',
        year: 1969,
        format: 'VHS',
        actors: [
          { fullname: 'Paul Newman' },
          { fullname: 'Robert Redford' },
        ],
      },
    ]
    const movies = MovieParser.parse(validMultipleMoviesStr);
    expect(movies).toEqual(expectedMovies);
  });

  const validSingleMovie = `
Title: movie
Release Year: 2000
Format: VHS
Stars: actor`;

  it('parse single valid movies', () => {
    const expectedMovies = [
      {
        name: 'movie',
        year: 2000,
        format: 'VHS',
        actors: [
          { fullname: 'actor' },
        ],
      },
    ]
    const movies = MovieParser.parse(validSingleMovie);
    expect(movies).toEqual(expectedMovies);
  });

  it('parse empty string', () => {
    expect(() => MovieParser.parse(''))
    .toThrowError('Can\'t parse provided data');
  });

  const incompleteMovie = `
Title: movie
Stars: actor
`
  it('parse incomplete movie data', () => {
    expect(() => MovieParser.parse(incompleteMovie))
    .toThrowError('Can\'t parse provided data');
  });

  const movieWithNoActors = `
  Title: movie
  Release Year: 2000
  Format: VHS`;

  it('parse movie with no actors', () => {
    const expectedMovies = [
      {
        name: 'movie',
        year: 2000,
        format: 'VHS',
        actors: [],
      },
    ];
    const movies = MovieParser.parse(movieWithNoActors)
    expect(movies).toEqual(expectedMovies);
  });

  const movieWithInvalidFormat = `
Title: movie
Release Year: 2000
Format: asdasda
Stars: actor`;

  it('parse movie with invalid format', () => {
    expect(() => MovieParser.parse(movieWithInvalidFormat))
    .toThrowError('Can\'t parse provided data');
  });

  const movieWithInvalidYear = `
Title: movie
Release Year: asdasd
Format: VHS
Stars: actor`;
  
    it('parse movie with invalid release year', () => {
      expect(() => MovieParser.parse(movieWithInvalidYear))
      .toThrowError('Can\'t parse provided data');
    });

});