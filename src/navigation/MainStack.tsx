import React, {FC} from 'react';
import {RouteModel} from 'models';
import routes from './RoutePaths';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import BottomTabs from './BottomTab';
import { MovieDetail } from 'screens';

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
        <Stack.Screen name={routes.home} component={BottomTabs} />
        <Stack.Screen name={routes.movieDetail} component={MovieDetail} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
