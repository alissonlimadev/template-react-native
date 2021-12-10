import Crashlytics from '../crashlytics/crashlytics.service';
import Sentry from '../sentry/sentry.service';

export default class LogsService {
  static logError(error: Error): void {
    Crashlytics.recordError(error);
    Sentry.captureException(error);
  }
}
