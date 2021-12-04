import { AxiosRequestConfig, Firebase } from '~/modules';
import { checkTrackingPermission } from '~/utils';

interface ScreenViewParameters {
  /**
   * Screen name the user is currently viewing.
   */
  screen_name?: string;
  /**
   * Current class associated with the view the user is currently viewing.
   */
  screen_class?: string;
}

const Analytics = Firebase.analytics();
const Performance = Firebase.perf();

export default class AnalyticsService {
  static async logEvent(
    event: string,
    params?: Record<string, any>,
  ): Promise<void> {
    await Analytics.logEvent(event, params);
  }

  static async logScreen(params: ScreenViewParameters): Promise<void> {
    await Analytics.logScreenView(params);
  }

  static async logLogin(method: string): Promise<void> {
    await Analytics.logLogin({ method });
  }

  static async logSearch(search_term: string): Promise<void> {
    await Analytics.logSearch({ search_term });
  }

  static async logTutorialBegin(): Promise<void> {
    await Analytics.logTutorialBegin();
  }

  static async logTutorialComplete(): Promise<void> {
    await Analytics.logTutorialComplete();
  }

  static async setUserId(userId: string): Promise<void> {
    const hasPermission = await checkTrackingPermission();
    if (hasPermission) {
      await Analytics.setUserId(userId);
    }
  }

  static async setUserProperties(
    name: string,
    value: string | null,
  ): Promise<void> {
    if (name) await Analytics.setUserProperty(name, value);
  }

  static async logNetwork(
    config: AxiosRequestConfig | any,
  ): Promise<AxiosRequestConfig | any> {
    if (config.url && config.method) {
      const method: any = config.method.toUpperCase();
      const httpMetric = Performance.newHttpMetric(config.url, method);
      config.metadata = { httpMetric };
      await httpMetric.start();
    }
    return config;
  }

  static async clear(): Promise<void> {
    await Analytics.resetAnalyticsData();
  }

  static async test(): Promise<void> {
    await this.logEvent('test');
  }
}
