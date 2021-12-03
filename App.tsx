import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';
import { AppState, AppStateStatus } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { APP_STATE, checkTrackingPermission, isIOS } from '~/utils';
import Main from './src';
import store from './src/stores';
import { ThemeController } from './src/theme';

const App = () => {
  useEffect(() => {
    const statusEvent = AppState.addEventListener('change', handleChange);
    return () => {
      statusEvent.remove();
    };
  }, []);

  const handleChange = (nextAppState: AppStateStatus) => {
    if (isIOS() && nextAppState === APP_STATE.ACTIVE) {
      checkTrackingPermission();
    }
  };
  return (
    <NavigationContainer>
      <Provider rootStore={store}>
        <ThemeController>
          <Main />
        </ThemeController>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
