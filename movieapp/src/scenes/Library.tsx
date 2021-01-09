import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Layout, Text, Button, Spinner, CheckBox, Input } from '@ui-kitten/components';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import MovieCard from '_components/MovieCard';
import { moviesSelector, moviesStateSelector } from '_selectors/movies';
import { NavigationProps } from '_types/navigation';
import { MovieConfig, MovieRecord } from '_types/movie';
import { fetchMovies } from '_actions/movies';
import { MovieQuery } from '_types/store';
import { PlusIcon, SearchIcon } from '../atoms/icons';
import { useCheckboxState, useInputState } from './helpers';
import { ScrollView } from 'react-native-gesture-handler';

const Library: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  const sortedCheckboxState = useCheckboxState();
  const searchInputState = useInputState();
  const { loading, error } = useSelector(moviesStateSelector);
  const movies = useSelector(moviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialQuery: MovieQuery = {
      search: '',
      sorted: false,
    }
    dispatch(fetchMovies(initialQuery));
  }, []);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.search}>
        <Layout style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Input
            style={styles.input}
            status='primary'
            placeholder='Enter movie titile, actors name etc.'
            {...searchInputState}
          />
          <Button
            style={styles.searchButton}
            onPress={() => {
              dispatch(fetchMovies({
                sorted: sortedCheckboxState.checked,
                search: searchInputState.value,
              }));
            }}
            accessoryLeft={SearchIcon}
          />
        </Layout>
        <CheckBox
          status='primary'
          {...sortedCheckboxState}>
          Order by name
        </CheckBox>
      </Layout>
      <Layout style={styles.content}>
        {loading && <Spinner />}
        {!loading && error && (
          <Text status="danger">{`Error occured: ${error.message}`}</Text>
        )}
        {!loading && !error && (
          <ScrollView style={styles.list}>
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                footer={() => (
                  <Button
                    accessoryLeft={SearchIcon}
                    onPress={() => (
                      navigation.navigate('ShowMoive', { movie })
                    )}
                  >
                    Show movie info
                  </Button>
                )}
              />
            ))}
          </ScrollView>
        )}
      </Layout>
      <Button
        onPress={() => navigation.navigate('NewMovieModal', {
          onSubmit: (newMovie: MovieConfig) => {
            console.log(newMovie);
          }
        })}
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
    paddingVertical: 5,
    width: '90%',
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
  deckHint: {
    marginBottom: 10,
  },
  headingArea: {
    marginVertical: 7,
  },
});

export default Library;
