import express from "express";
import morgan from 'morgan';
import bodyParser from 'body-parser';
import * as http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import config from './config';
import Movie from "./models/Movie";
import {
  validateSearchQuery,
  validateImportFile,
} from "./middlewares";
import { MovieConfig, MovieQuery } from "./types";
import MovieParser from "./services/MovieParser";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));


app.get('/movies',
  validateSearchQuery,
  async (req, res) => {
  const movieQuery = req.query as MovieQuery;
  const { search, sorted } = movieQuery;

  try {
    const data = await Movie.find(search
      ? { $text: { $search: search } }
      : {})
    .sort(sorted
      ? { name: 'asc'}
      : { created: 'desc' });
    
    res.json({ data });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.post('/movies', async (req, res) => {
  const movie = req.body as MovieConfig;

  try {
    const data = await Movie.create(movie);
    res.json({ data });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.post('/movies/import',
validateImportFile,
async (req, res) => {
  const movies = req.files.movies as fileUpload.UploadedFile;
  const fileContent = movies.data.toString();
  try {
    const parsedMovies = MovieParser.parse(fileContent);
    const data = await Movie.create(parsedMovies);
    res.json({ data });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.delete('/movies/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Movie.findOneAndDelete({ _id: id });
    if(!data) throw new Error('Movie not found');
    res.json({ data });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("error", (err) => {
  console.error(
    'Error occurred during an attempt to establish connection with the database: ',
    err
  );
  process.exit(1);
});

mongoose.connection.on("open", () => {
  server.listen(config.apiPort, () => {
    console.log(`API listening at http://localhost:${config.apiPort}`)
  });
});
