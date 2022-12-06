import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from 'stores';

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>index</Text>
      </View>
    </Provider>
  );
}
