import { useEffect } from 'react';

import { CodePush } from '~/modules';
import { Logs } from '~/services';

export const useCodePush = () => {
  useEffect(() => {
    codePushCheck();
  }, []);

  const codePushCheck = async (): Promise<void> => {
    try {
      if (__DEV__) {
        return;
      }

      const { ON_NEXT_RESTART } = CodePush.InstallMode;

      await CodePush.sync({
        installMode: ON_NEXT_RESTART,
        mandatoryInstallMode: ON_NEXT_RESTART,
        minimumBackgroundDuration: 0,
      });
    } catch (e: any) {
      Logs.logError(e);
    }
  };
  return { codePushCheck };
};
