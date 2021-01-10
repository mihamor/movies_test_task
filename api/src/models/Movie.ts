import mongoose from "mongoose";

const ActorSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required : true,
  },
});

const MovieSchema = new mongoose.Schema({
  created: Number,
  name: {
    type: String,
    unique : true,
    required : true,
  },
  year: {
    type: Number,
    required : true,
  },
  format: {
    type: String,
    enum : ['VHS', 'DVD', 'Blu-Ray'],
    required : true,
  },
  actors: {
    type: [ActorSchema],
    required: true,
  },
});

MovieSchema.index({
  name: 'text',
  'actors.fullname': 'text',
});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;
