import { createStackNavigator } from 'react-navigation-stack';
import MainNavigator from '_navigations/MainNavigator';
import NewMovieModal from '_scenes/NewMovieModal';

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: MainNavigator,
    },
    NewMovieModal: {
      screen: NewMovieModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);


export default RootNavigator;
