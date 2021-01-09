import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Layout, Text, Button, Spinner } from '@ui-kitten/components';
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


const Library: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
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
      {loading && <Spinner />}
      {!loading && error && (
        <Text status="danger">{`Error occured: ${error.message}`}</Text>
      )}
      {!loading && !error && (
        <FlatList
          keyExtractor={(moive) => moive._id}
          style={styles.list}
          extraData={movies}
          data={movies}
          renderItem={({
            item: movie,
          }: { item: MovieRecord; }) => (
            <MovieCard
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
          )}
        />
      )}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
