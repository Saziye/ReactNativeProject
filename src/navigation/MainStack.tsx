import React, {FC} from 'react';
import {RouteModel} from 'models';
import routes from './RoutePaths';
import {Home} from 'screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RouteModel>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  orientation: 'portrait',
  animation: 'slide_from_right',
};

const MainStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={routes.home}>
      <Stack.Group>
        <Stack.Screen name={routes.home} component={Home} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
