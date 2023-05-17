import 'react-native-gesture-handler';

import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store, {persistor} from './redux/store';
import AppNavigator from './components/organisms/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styles from './styles/styles';

const App = () => (
  <GestureHandlerRootView style={styles.flex}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
);

export default App;
