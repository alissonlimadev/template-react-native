import { AsyncStorage } from '~/modules';
import { ThemeMode } from '~/utils';
import Keys from './keys';

export default class Storage {
  static async clearWholeStorage(): Promise<void> {
    // get stored values
    const loggedIn = await this.getPreviousLogged();
    const token = await this.getToken();
    // clear storage
    await AsyncStorage.clear();
    // set values that should be persisted
    if (!!token) await this.setToken(token);
    if (loggedIn) await this.setPreviousLogged();
  }

  static async getAllStorage(): Promise<any> {
    return AsyncStorage.getAllKeys();
  }

  static async setToken(token: Token): Promise<void> {
    await AsyncStorage.setItem(Keys.TOKEN, JSON.stringify(token));
    if (token) {
      await this.setPreviousLogged();
    }
  }

  static async getToken(): Promise<Token | null> {
    const item = await AsyncStorage.getItem(Keys.TOKEN);
    return item ? JSON.parse(item) : '';
  }

  static async setPreviousLogged(): Promise<void> {
    await AsyncStorage.setItem(Keys.PREVIOUS_LOGGED, 'true');
  }

  static async getPreviousLogged(): Promise<boolean> {
    const flag = await AsyncStorage.getItem(Keys.PREVIOUS_LOGGED);
    return !!flag;
  }

  static async setThemeMode(mode: ThemeMode): Promise<void> {
    await AsyncStorage.setItem(Keys.THEME_MODE, mode);
  }

  static async getThemeMode(): Promise<string | null> {
    return await AsyncStorage.getItem(Keys.THEME_MODE);
  }
}
