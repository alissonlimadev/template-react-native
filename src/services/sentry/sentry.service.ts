import * as Sentry from '@sentry/react-native';
import { Env } from '~/modules';
import { checkTrackingPermission } from '~/utils';

const isPRD = Env.ENV === 'PRD';
export default class SentryService {
  static init(): void {
    if (__DEV__) return;
    Sentry.init({
      dsn: Env.SENTRY_DSN,
      environment: isPRD ? 'production' : 'homolog',
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

  static test(): void {
    Sentry.captureMessage('Error Sentry');
  }
}
