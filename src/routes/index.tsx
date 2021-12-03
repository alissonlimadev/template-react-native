import React, { useContext, useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationState,
  PartialState,
  ThemeContext,
  createStackNavigator,
} from '~/modules';
import { Analytics } from '~/services';
import { Stacks } from '~/utils';
import { AuthStack, ModalsStack, PrivateStack, PublicStack } from './stacks';

const getActiveRouteName = (
  state: NavigationState | PartialState<NavigationState>,
): string => {
  if (state.index != null) {
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  }
  return '';
};

const MainStack = createStackNavigator();

type Props = {
  setNavigationTop: (
    navigatorRef: NavigationContainerRef<NavigationParams>,
  ) => void;
  token?: string;
  previouslyLogged: boolean;
};

export const Navigation: React.FC<Props> = ({
  setNavigationTop,
  token,
  previouslyLogged,
}) => {
  const routeNameRef = useRef<any>();
  const { pallete } = useContext(ThemeContext);
  const contextTheme = {
    dark: false,
    colors: {
      primary: pallete.primary.main,
      background: 'transparent',
      card: pallete.primary.main,
      text: pallete.primary.contrast,
      border: pallete.primary.main,
      notification: pallete.primary.main,
    },
  };

  const onNavigationStateChange = (state?: NavigationState) => {
    if (state) {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = getActiveRouteName(state);
      if (previousRouteName !== currentRouteName) {
        Analytics.logScreen({ screen_name: currentRouteName });
      }
      routeNameRef.current = currentRouteName;
    }
  };

  const publicRoute = previouslyLogged ? Stacks.AUTH : Stacks.PUBLIC;
  const initialRoute = token ? Stacks.PRIVATE : publicRoute;

  return (
    <NavigationContainer
      ref={setNavigationTop}
      theme={contextTheme}
      onStateChange={onNavigationStateChange}
    >
      <MainStack.Navigator
        screenOptions={{ headerShown: false, presentation: 'modal' }}
        initialRouteName={initialRoute}
      >
        <MainStack.Screen name={Stacks.PRIVATE} component={PrivateStack} />
        <MainStack.Screen name={Stacks.PUBLIC} component={PublicStack} />
        <MainStack.Screen name={Stacks.MODAL} component={ModalsStack} />
        <MainStack.Screen name={Stacks.AUTH} component={AuthStack} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
