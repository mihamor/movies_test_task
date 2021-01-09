import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';

import { NavigationProps } from '_types/navigation';
import { MovieConfig } from '_types/movie';
import { PlusIcon } from '../atoms/icons';
import { StyleSheet } from 'react-native';


const Library: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1'>HOME</Text>
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


const styles = StyleSheet.create({
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Library;
