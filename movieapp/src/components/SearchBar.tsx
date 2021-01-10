import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Button,
  Toggle,
  Input,
} from '@ui-kitten/components';

import { MovieQuery } from '_types/store';
import { SearchIcon } from '../atoms/icons';

type Props = {
  onSearch: (query: MovieQuery) => void;
};

const SearchBar: React.FC<Props> = ({
  onSearch,
}: Props) => {
  const [sorted, setSorted] = useState(false);
  const [search, setSearch] = useState<string>('');

  useEffect(() => onSearch({ search, sorted }), [sorted]);

  return (
    <Layout style={styles.search}>
      <Layout style={styles.inputRow}>
        <Input
          style={styles.input}
          placeholder='Enter movie titile, actors name etc.'
          value={search}
          onChangeText={setSearch}
        />
        <Button
          style={styles.searchButton}
          onPress={() => onSearch({ sorted, search })}
          accessoryLeft={SearchIcon}
        />
      </Layout>
      <Toggle
        onChange={setSorted}
        checked={sorted}
      >
        Order by title
      </Toggle>
    </Layout>
  );
};


const styles = StyleSheet.create({
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
});

export default SearchBar;
