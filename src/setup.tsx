import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { Env } from '~/modules';
import { Crashlytics, RemoteConfig, Sentry, Storage } from '~/services';
import { theme, useTheme } from '~/theme';
import { APP_STATE, checkTrackingPermission, isIOS } from './utils';

type State = {
  token?: Token;
  previouslyLogged: boolean;
  loading: boolean;
};

type Props = {
  onFinish(params: State): void;
};

const SetupContainer: React.FC<Props> = ({ onFinish }) => {
  const appState = useRef(AppState.currentState);
  const { getRemoteTheme } = useTheme();
  const [isForeground, setIsForeground] = useState<boolean>(true);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setIsForeground(true);
    } else {
      setIsForeground(false);
    }
  };

  const secureEmulator = async (): Promise<void> => {
    try {
      const isPRD = Env.ENV === 'PRD';
      if (isPRD) {
        // blockEmulator();
      }
    } catch (error: Error | any) {
      Crashlytics.recordError(error);
    }
  };

  const checkPermission = () => {
    if (isIOS() && appState.current === APP_STATE.ACTIVE) {
      checkTrackingPermission();
    }
  };

  const fetchRemoteConfig = async () => {
    await RemoteConfig.setup({
      light_theme: JSON.stringify(theme),
      dark_theme: JSON.stringify(theme),
    });
    await getRemoteTheme();
  };

  const bootstrap = async (): Promise<void> => {
    try {
      Sentry.init();
      const token = await Storage.getToken();
      const previouslyLogged = await Storage.getPreviousLogged();
      secureEmulator();
      await fetchRemoteConfig();
      onFinish({
        token: token || undefined,
        previouslyLogged,
        loading: false,
      });
    } catch (error: Error | any) {
      Crashlytics.recordError(error);
    }
  };

  useEffect(() => {
    const appState = AppState.addEventListener('change', _handleAppStateChange);
    checkPermission();
    bootstrap();
    return () => {
      appState.remove();
    };
  }, []);

  return null;
};

export default SetupContainer;
