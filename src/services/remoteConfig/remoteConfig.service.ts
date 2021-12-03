import RemoteConfig, {
  FirebaseRemoteConfigTypes,
} from '@react-native-firebase/remote-config';

const fetchInterval = false ? 300 : 0; // 5 minutes cache if prod

const remoteConfig = RemoteConfig();
remoteConfig.setConfigSettings({
  minimumFetchIntervalMillis: fetchInterval,
});

export default class RemoteConfigService {
  static async setup(
    params: FirebaseRemoteConfigTypes.ConfigDefaults,
  ): Promise<void> {
    await remoteConfig.setDefaults(params);
    await remoteConfig.fetchAndActivate();
  }

  static async fetch(): Promise<void> {
    return remoteConfig.fetch(fetchInterval);
  }

  static async getValue(key: string): Promise<string> {
    return remoteConfig.getValue(key).asString();
  }

  static async getValueJson(key: string): Promise<JSON> {
    return JSON.parse(remoteConfig.getValue(key).asString());
  }

  static async getBoolean(key: string): Promise<boolean> {
    return remoteConfig.getBoolean(key);
  }
}
