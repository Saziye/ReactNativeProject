import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './root';
import RootStack from './RootStack';

const RootNavigator = () => {
  const onStateChange = async (routes: any) => {
    // console.log('%c routes ---> ', 'background:green;', routes);
  };

  const linking = {
    prefixes: ['reactnative://'],
    config: {
      screens: {},
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onStateChange={onStateChange}>
      <RootStack />
    </NavigationContainer>
  );
};

export default RootNavigator;
