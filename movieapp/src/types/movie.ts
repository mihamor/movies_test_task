interface Actor {
  fullname: string,
};

type Format = 'VHS' | 'DVD' | 'Blu-Ray';

export interface MovieConfig {
  name: string,
  year: Number,
  format: Format,
  actors: Actor[],
};

export interface MovieRecord extends MovieConfig {
  _id: string,
  created: string,
};