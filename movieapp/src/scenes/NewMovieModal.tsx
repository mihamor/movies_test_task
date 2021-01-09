import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ImageProps,
} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
  Layout,
  Input,
  Button,
  Icon,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import { IndexPath, RenderProp } from '@ui-kitten/components/devsupport';

import Header from '_components/Header';
import KeyboardAvoidingView from '_components/KeyboardAvoidingView';
import formats from '_constants/formats';
import { NavigationProps } from '_types/navigation';

const MAXIMUM_ACTORS = 5;
interface ActorInputValue {
  id: string,
  fullname: string,
};

const NewMovieModal: React.FC<NavigationProps> = ({
  navigation,
}: NavigationProps) => {
  const onSubmit = navigation.getParam('onSubmit', null);
  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<number>(2000);
  const [formatIndex, setFormatIndex] = useState<IndexPath>(new IndexPath(0));
  const format = formats[formatIndex.row];
  const [actors, setActors] = useState<ActorInputValue[]>([]);

  const handleActorChange = (index: number, value: string) => {
    const modifiedActors = [...actors];
    modifiedActors[index].fullname = value;
    setActors(modifiedActors);
  };

  const getInputIconComponent = (
    index: number,
  ): RenderProp<Partial<ImageProps>> => (
    (props) => (
      <TouchableWithoutFeedback onPress={() => {
        const modifiedActors = actors.filter(
          (_actor, actorIndex) => index !== actorIndex,
        );
        setActors(modifiedActors);
      }}
      >
        <Icon {...props} name="close" />
      </TouchableWithoutFeedback>
    ));

  return (
    <Layout style={styles.container}>
      <Header
        title="New movie"
        onBackPress={() => navigation.goBack(null)}
      />
      <KeyboardAvoidingView contentContainerStyle={styles.content}>
        <Layout style={styles.formContainer}>
          <Input
            style={styles.input}
            size="large"
            placeholder="Enter movie name"
            label="Name"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
          />
          <Input
            style={styles.input}
            size="large"
            keyboardType='number-pad'
            placeholder="Enter release year"
            label="Release year"
            autoCapitalize="none"
            value={year.toString()}
            onChangeText={text => setYear(Number(text))}
          />
          <Select
            label="Format"
            value={format}
            selectedIndex={formatIndex}
            onSelect={(index) => {
              if(!Array.isArray(index))
                setFormatIndex(index)
            }}>
            {formats.map((format) => (
              <SelectItem
                key={format}
                title={format}
              />
            ))}
          </Select>
          {actors.map((actor, index) => (
            <Input
              accessoryRight={getInputIconComponent(index)}
              key={actor.id}
              style={styles.input}
              size="large"
              placeholder="Enter actor fullname"
              label="Actor fullname"
              autoCapitalize="none"
              value={actor.fullname}
              onChangeText={(value) => handleActorChange(index, value)}
            />
          ))}
          <Button
            style={styles.button}
            size="large"
            disabled={actors.length > MAXIMUM_ACTORS}
            onPress={() => {
              setActors([
                ...actors,
                {
                  id: uuidv4(),
                  fullname: '',
                },
              ]);
            }}
          >
            Add new actor
          </Button>
          <Button
            disabled={!name
              || !year
              || !actors.length
              || actors.some((actor) => !actor.fullname)}
            style={styles.button}
            size="large"
            onPress={() => {
              const newMovie = {
                id: uuidv4(),
                created: Date.now(),
                name,
                year,
                format: formats[formatIndex.row],
                actors: actors.map(({ fullname }) => ({ fullname })),
              };
              onSubmit(newMovie);
              navigation.goBack();
            }}
          >
            Create new movie
          </Button>
        </Layout>
      </KeyboardAvoidingView>
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
  },
  formContainer: {
    marginTop: '5%',
    width: '80%',
  },
  button: {
    marginVertical: 10,
  },
  input: {
    marginTop: 10,
  },
});

export default NewMovieModal;
