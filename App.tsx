import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Theme } from '@react-navigation/native/lib/typescript/src/types';

import { store, persistor } from './src/store';

import Routes from './src/routes';

const CustomTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#82327E'
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={CustomTheme}>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
