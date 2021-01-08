export interface MovieQuery {
  search?: string,
  sorted?: boolean,
};

interface Actor {
  fullname: string,
};

type Format = 'VHS' | 'DVD' | 'Blu-Ray';

export interface MovieConfig {
  name: String,
  year: Number,
  format: Format,
  actors: Actor[],
};

export interface MovieRecord extends MovieConfig {
  _id: string,
  created: string,
};