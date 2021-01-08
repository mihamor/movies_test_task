import { RequestHandler } from 'express';


export const validateSearchQuery: RequestHandler = (req, res, next) => {
  const { sorted, search } = req.query;

  console.log(typeof sorted);
  console.log(typeof search);
  if(typeof sorted !== 'string' && typeof sorted !== 'undefined'
  && typeof search !== 'string' && typeof search !== 'undefined') {
    res.status(400).json({
      error: 'Invalid query params'
    });
  } else {
    next();
  }
};

export const validateImportFile: RequestHandler = (req, res, next) => {
  const movies = req.files.movies;

  if(!movies
    || Array.isArray(movies)
    || movies.mimetype !== 'text/plain') {
    res.status(400).json({
      error: 'Invalid import file'
    });
  } else {
    next();
  }
};
