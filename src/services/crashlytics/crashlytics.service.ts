import { Firebase } from '~/modules';
import { checkTrackingPermission } from '~/utils';

const Crashlytics = Firebase.crashlytics();

export default class CrashlyticsService {
  static log(message: string): void {
    Crashlytics.log(message);
  }
  static recordError(error: Error): void {
    Crashlytics.recordError(error);
  }

  static async setUserId(userId: string): Promise<void> {
    const hasPermission = await checkTrackingPermission();
    if (hasPermission) {
      await Crashlytics.setUserId(userId);
    }
  }

  static async setAttribute(name: string, value: string): Promise<void> {
    await Crashlytics.setAttribute(name, value);
  }

  static async setAttributes(attributes: {
    [key: string]: string;
  }): Promise<void> {
    await Crashlytics.setAttributes(attributes);
  }

  static async test(): Promise<void> {
    await Crashlytics.setCrashlyticsCollectionEnabled(true);
    Crashlytics.crash();
  }

  static async crash(): Promise<void> {
    await Crashlytics.setCrashlyticsCollectionEnabled(true);
    Crashlytics.crash();
  }
}
