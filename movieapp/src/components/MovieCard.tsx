import React from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  Layout,
  Card,
  Text,
} from '@ui-kitten/components';

import { MovieRecord } from '_types/movie';

type Props = {
  movie: MovieRecord,
  footer?: () => React.ReactElement,
  headerAccessories?: () => React.ReactElement,
};

const MovieCard = ({
  movie,
  footer,
  headerAccessories,
}: Props) => (
  <Layout style={styles.itemLayout}>
    <Card
      footer={footer}
      header={() => (
        <Layout style={styles.headerPanel}>
          <Text
            style={styles.headerText}
            category="h6"
          >
            {movie.name}
          </Text>
          <Layout style={styles.headerAccessories}>
            {headerAccessories && headerAccessories()}
          </Layout>
        </Layout>
      )}
    >
      <Text style={styles.movieInfo}>
        {`Release year: ${movie.year}`}
      </Text>
      <Text style={styles.movieInfo}>
        {`Format: ${movie.format}`}
      </Text>
    </Card>
  </Layout>
);


const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  movieInfo: {
    marginTop: 10,
  },
  itemLayout: {
    width: '90%',
    marginLeft: '5%',
    marginVertical: 20,
  },
  headerPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerAccessories: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default MovieCard;
