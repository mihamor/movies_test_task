import { createStackNavigator } from 'react-navigation-stack';

import Library from '_scenes/Library';
import Movie from '_scenes/Movie';


const AppNavigator = createStackNavigator(
  {
    Library: { screen: Library },
    Movie: { screen: Movie },
  },
  {
    headerMode: 'none',
  },
);

export default AppNavigator;
