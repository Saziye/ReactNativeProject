import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'stores';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Router from 'navigation';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Router />
      </SafeAreaProvider>
    </Provider>
  );
}
