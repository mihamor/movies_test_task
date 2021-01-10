import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Layout,
  Text,
  Button,
  Spinner,
  Toggle,
  Input,
} from '@ui-kitten/components';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  addMovie,
  fetchMovies,
  deleteMovie,
} from '_actions/movies';
import MovieCard from '_components/MovieCard';
import ConfirmModal from '_components/ConfirmModal';
import { moviesSelector, moviesStateSelector } from '_selectors/movies';
import { NavigationProps } from '_types/navigation';
import {  MovieRecord } from '_types/movie';
import { MovieQuery } from '_types/store';
import { PlusIcon, SearchIcon, TrashIcon } from '../atoms/icons';
import {  useInputState } from './helpers';

const Library: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [focusedMovie, setFocusedMovie] = useState<MovieRecord | null>(null);
  const [orderChecked, setOrderChecked] = useState(false);
  const searchInputState = useInputState();
  const { loading, error } = useSelector(moviesStateSelector);
  const movies = useSelector(moviesSelector);
  const dispatch = useDispatch();;

  useEffect(() => {
    const initialQuery: MovieQuery = {
      search: '',
      sorted: false,
    }
    dispatch(fetchMovies(initialQuery));
  }, []);

  const onSearch = () => {
    dispatch(fetchMovies({
      sorted: orderChecked,
      search: searchInputState.value,
    }));
  };

  const onNewMovie = () => navigation.navigate('NewMovieModal', {
    onSubmit: (newMovie: MovieRecord) => {
      dispatch(addMovie(newMovie));
    }
  });

  useEffect(() => onSearch(), [orderChecked]);

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
      <Layout style={styles.search}>
        <Layout style={styles.inputRow}>
          <Input
            style={styles.input}
            placeholder='Enter movie titile, actors name etc.'
            {...searchInputState}
          />
          <Button
            style={styles.searchButton}
            onPress={onSearch}
            accessoryLeft={SearchIcon}
          />
        </Layout>
        <Toggle
          onChange={setOrderChecked}
          checked={orderChecked}
        >
          Order by title
        </Toggle>
      </Layout>
      <Layout style={styles.content}>
        {loading && <Spinner />}
        {!loading && error && (
          <Text status="danger">{`Error occured: ${error.message}`}</Text>
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
  search: {
    alignItems: 'flex-start',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    marginRight: 5,
  },
  searchButton: {
    width: '8%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '85%',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '49%',
  },
  list: {
    height: '92%',
    width: '100%',
  },
  listContainer: {
    height: '100%',
    position: 'relative',
  },
  headingArea: {
    marginVertical: 7,
  },
});

export default Library;
