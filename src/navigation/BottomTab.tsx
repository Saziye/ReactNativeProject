import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Search, Home, SignUp} from 'screens';
import {RouteModel} from 'models';
import routes from './RoutePaths';
import {CustomBottomTab} from 'components';

const BottomTabsNavigator = createBottomTabNavigator<RouteModel>();

const BottomTabs: FC = () => {
  return (
    <BottomTabsNavigator.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomBottomTab {...props} />}>
      <BottomTabsNavigator.Screen name={routes.home} component={Home} />
      <BottomTabsNavigator.Screen name={routes.search} component={Search} />
      <BottomTabsNavigator.Screen name={routes.signup} component={SignUp} />
    </BottomTabsNavigator.Navigator>
  );
};

export default BottomTabs;
