import * as Sentry from '@sentry/react-native';
import { Env } from '~/modules';
import { checkTrackingPermission } from '~/utils';

export default class SentryService {
  static init(): void {
    console.log('dsn', Env.SENTRY_DSN);
    Sentry.init({
      dsn: Env.SENTRY_DSN,
      environment: __DEV__ ? 'homolog' : 'production',
    });
  }

  static async setUser(userEmail: string): Promise<void> {
    if (__DEV__) return;
    const canTracking = await checkTrackingPermission();
    if (canTracking) {
      Sentry.setUser({
        email: userEmail,
      });
    }
  }

  static captureException(exception: Error | unknown): void {
    Sentry.captureException(exception);
  }

  static test(): void {
    Sentry.captureMessage('Error Sentry');
  }
}
