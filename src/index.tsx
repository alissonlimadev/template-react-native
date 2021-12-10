import React, { useEffect, useState } from 'react';
import { Provider } from 'mobx-react';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';
import SplashScreen from 'react-native-splash-screen';
import { DropdownAlert } from '~/modules';
import { Navigation } from '~/routes';
import { NavigationActions } from '~/services';
import store from '~/stores';
import { ThemeController } from '~/theme';
import { setAlert, useCodePush } from '~/utils';
import Setup from './setup';

type State = {
  token?: Token;
  previouslyLogged: boolean;
  loading: boolean;
};

const App = () => {
  const [state, setState] = useState<State>({
    token: undefined,
    previouslyLogged: false,
    loading: true,
  });

  const onFinish = (params: State) => setState(params);

  useCodePush();

  useEffect(() => {
    if (!state.loading) {
      SplashScreen.hide();
    }
  }, [state.loading]);

  return (
    <Provider rootStore={store}>
      <ThemeController>
        <Navigation
          previouslyLogged={state.previouslyLogged}
          token={state.token?.accessToken}
          setNavigationTop={NavigationActions.setTopLevelNavigator}
        />
        <Setup onFinish={onFinish} />
      </ThemeController>
      <DropdownAlert
        ref={(ref) => setAlert(ref)}
        updateStatusBar={false}
        closeInterval={4000}
        defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight }}
      />
    </Provider>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.MANUAL,
})(App);
