import { createStackNavigator } from 'react-navigation-stack';

import Library from '_scenes/Library';


const AppNavigator = createStackNavigator(
  {
    Library: { screen: Library },
  },
  {
    headerMode: 'none',
  },
);

export default AppNavigator;
