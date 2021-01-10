# movies_test_task

## Starting DB & API server:

`docker-compose up`

## Starting Android application:

```
cd movieapp
yarn install
yarn run android
```

## Tech stack

### DB

 * mongodb

### API server

 * typescript
 * node.js
 * express.js
 * mongoose

 ### Application
 * typescript
 * react-native
 * redux
 * redux-thunk
 * react-navigation

### Components library
  UI-Kitten
### Mentions
  In this project I've used `redux-offline` to implement optimistic updates and to achive more native feel

## Application showcase:

### Add movie: 
![](docs/gifs/add%20movie.gif)

### Delete movie: 
![](docs/gifs/delete%20movie.gif)

### Import movies: 
![](docs/gifs/import%20movies.gif)

### Get movie info:
![](docs/gifs/movie%20info.gif)

### Order movies by title:
![](docs/gifs/orber%20by%20title.gif)

### Search movies by title & actors name:
![](docs/gifs/search.gif)
