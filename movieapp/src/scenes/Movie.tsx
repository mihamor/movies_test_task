import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
} from '@ui-kitten/components';

import Header from '_components/Header';
import { NavigationProps } from '_types/navigation';
import { MovieRecord } from '_types/movie';
import { PersonIcon } from '../atoms/icons';


const Movie: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  const movie: MovieRecord = navigation.getParam('movie');
  return (
    <Layout style={styles.container}>
      <Header
        title={movie.name}
        onBackPress={() => navigation.goBack(null)}
      />
      <Layout style={styles.content}>
        <Layout style={styles.movieContainer}>
          <Text category="h3">{movie.name}</Text>
          <Text category="h6">{`Release year: ${movie.year}`}</Text>
          <Text category="h6">{`Format: ${movie.format}`}</Text>
          <Text category="h6">Cast:</Text>
          <List
            data={movie.actors}
            renderItem={(actor) => (
              <ListItem
                title={actor.item.fullname}
                accessoryLeft={PersonIcon}
              />
            )}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieContainer: {
    marginTop: '10%',
    width: '80%',
  },
});

export default Movie;
