import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { createAppContainer } from 'react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from "redux-thunk";

import rootReducer from '_reducers/root';
import RootNavigator from '_navigations/RootNavigator';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), offline(offlineConfig))
);

const AppContainer = createAppContainer(RootNavigator);
const App: React.FC = () => (
  <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </ApplicationProvider>
  </Provider>
);

export default App;
