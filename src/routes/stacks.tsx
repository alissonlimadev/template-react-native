import React from 'react';
import { createStackNavigator } from '~/modules';
import { Home, Login } from '~/screens';
import { Routes } from '~/utils/enums';

const Private = createStackNavigator<PrivateStackParams>();
const Auth = createStackNavigator<AuthenticateStackParams>();
const Public = createStackNavigator<PublicStackParams>();
const Modals = createStackNavigator<ModalsStackParams>();

const defaultOptions = { headerShown: false };

export const AuthStack = (): JSX.Element => (
  <Auth.Navigator
    initialRouteName={Routes.CONFIRM_LOGIN}
    screenOptions={defaultOptions}
  >
    <Auth.Screen name={Routes.RETRY_AUTH} component={Login} />
    <Auth.Screen name={Routes.CONFIRM_LOGIN} component={Login} />
  </Auth.Navigator>
);

export const PublicStack = (): JSX.Element => (
  <Public.Navigator
    initialRouteName={Routes.LOGIN}
    screenOptions={defaultOptions}
  >
    <Public.Screen name={Routes.LOGIN} component={Login} />
  </Public.Navigator>
);

export const PrivateStack = (): JSX.Element => (
  <Private.Navigator initialRouteName={Routes.HOME}>
    <Private.Screen name={Routes.HOME} component={Home} />
  </Private.Navigator>
);

export const ModalsStack = (): JSX.Element => (
  <Modals.Navigator
    screenOptions={{ ...defaultOptions, presentation: 'modal' }}
  >
    <Modals.Screen name={Routes.INFO} component={Home} />
  </Modals.Navigator>
);
