import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Layout,
  Text,
  Button,
  Spinner,
} from '@ui-kitten/components';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addMovie,
  fetchMovies,
  deleteMovie,
  importMovies,
} from '_actions/movies';
import MovieCard from '_components/MovieCard';
import ConfirmModal from '_components/ConfirmModal';
import { moviesSelector, moviesStateSelector } from '_selectors/movies';
import { NavigationProps } from '_types/navigation';
import {  MovieRecord } from '_types/movie';
import { MovieQuery } from '_types/store';
import { PlusIcon, SearchIcon, TrashIcon } from '../atoms/icons';
import SearchBar from '_components/SearchBar';

const Library: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [focusedMovie, setFocusedMovie] = useState<MovieRecord | null>(null);
  const { loading, error } = useSelector(moviesStateSelector);
  const movies = useSelector(moviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialQuery: MovieQuery = {
      search: '',
      sorted: false,
    };
    dispatch(fetchMovies(initialQuery));
  }, []);

  const onSearch = (query: MovieQuery) => {
    dispatch(fetchMovies(query));
  };

  const onNewMovie = () => navigation.navigate('NewMovieModal', {
    onSubmit: (newMovie: MovieRecord) => {
      dispatch(addMovie(newMovie));
    },
    onImport: (formData: FormData) => {
      dispatch(importMovies(formData));
    }
  });

  const onDelete = () => {
    if (focusedMovie) {
      dispatch(deleteMovie(focusedMovie));
    }
    setConfirmVisible(false);
  }

  return (
    <Layout style={styles.container}>
      <ConfirmModal
        visible={confirmVisible}
        title="Are you sure you want to delete this movie?"
        description="This action can't be undone"
        onBackdropPress={() => setConfirmVisible(false)}
        onReject={() => setConfirmVisible(false)}
        onConfirm={onDelete}
      />
      <SearchBar onSearch={onSearch} />
      <Layout style={styles.content}>
        {loading && <Spinner />}
        {!loading && error && (
          <Text style={styles.infoText} status="danger">{`Error occured: ${error.message}`}</Text>
        )}
        {!loading && !error && !movies.length && (
          <Text style={styles.infoText} appearance="hint">No movies found :(</Text>
        )}
        {!loading && movies && (
          <ScrollView style={styles.list}>
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                footer={() => (
                  <Button
                    accessoryLeft={SearchIcon}
                    onPress={() => navigation.navigate('Movie', { movie })}
                  >
                    Show movie info
                  </Button>
                )}
                headerAccessories={() => (
                  <Button
                    status="control"
                    accessoryLeft={TrashIcon}
                    onPress={() => {
                      setFocusedMovie(movie);
                      setConfirmVisible(true);
                    }}
                  />
                )}
              />
            ))}
          </ScrollView>
        )}
      </Layout>
      <Button
        onPress={onNewMovie}
        accessoryLeft={PlusIcon}
        style={styles.addButton}
      />
    </Layout>
  );
};


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '85%',
  },
  infoText: {
    marginTop: 20,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  list: {
    height: '92%',
    width: '100%',
  },
});

export default Library;
