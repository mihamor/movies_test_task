export interface MovieQuery {
  search?: string,
  sorted?: string,
};

interface Actor {
  fullname: string,
};

export type Format = 'VHS' | 'DVD' | 'Blu-Ray';

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