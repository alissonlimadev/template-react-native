// import { AsyncStorage } from '~/modules';
// import Keys from './keys';

// export default class Storage {
//   static async clearWholeStorage(): Promise<void> {
//     // get stored values
//     const loggedIn = await this.getPreviousLogged();
//     const token = await this.getPushToken();
//     const document = await this.getDocument();
//     // clear storage
//     await AsyncStorage.clear();
//     // set values that should be persisted
//     if (!!token) await this.setPushToken(token);
//     if (loggedIn) await this.setPreviousLogged(token);
//     if (document) await this.setDocument(document);
//   }

//   static async getAllStorage(): Promise<any> {
//     return AsyncStorage.getAllKeys();
//   }

//   static async setToken(token: Token): Promise<void> {
//     await AsyncStorage.setItem(Keys.TOKEN, JSON.stringify(token));
//     if (token) {
//       await this.setPreviousLogged();
//     }
//   }

//   static async getToken(): Promise<Token | null> {
//     const item = await AsyncStorage.getItem(Keys.TOKEN);
//     return item ? JSON.parse(item) : '';
//   }

//   static async setRefreshToken(refreshToken: string): Promise<void> {
//     AsyncStorage.setItem(Keys.REFRESH_TOKEN, JSON.stringify(refreshToken));
//   }

//   static async getRefreshToken(): Promise<string | null> {
//     const refreshToken = await AsyncStorage.getItem(Keys.REFRESH_TOKEN);
//     return refreshToken ? JSON.parse(refreshToken) : '';
//   }

//   static async setPreviousLogged(token?: PushToken): Promise<void> {
//     await AsyncStorage.setItem(Keys.PREVIOUS_LOGGED, 'true');
//     if (!!token) await this.setPushToken(token);
//   }

//   static async getPreviousLogged(): Promise<boolean> {
//     const flag = await AsyncStorage.getItem(Keys.PREVIOUS_LOGGED);
//     return !!flag;
//   }

//   static async setMessagingToken(token: string): Promise<void> {
//     AsyncStorage.setItem(Keys.MESSAGING_TOKEN, token);
//   }

//   static async getMessagingToken(): Promise<string | null> {
//     let token = await AsyncStorage.getItem(Keys.MESSAGING_TOKEN);
//     token = token ? JSON.parse(token) : '';
//     return token;
//   }

//   static async setCodepushVersion(codepushVersion: string): Promise<void> {
//     await AsyncStorage.setItem(Keys.CODEPUSH, JSON.stringify(codepushVersion));
//   }

//   static async getCodepushVersion(): Promise<string> {
//     const flag = await AsyncStorage.getItem(Keys.CODEPUSH);
//     return flag && JSON.parse(flag);
//   }

//   static async setInviteCode(code: string): Promise<void> {
//     AsyncStorage.setItem(Keys.INVITE_CODE, code);
//   }

//   static async getInvitateCode(): Promise<string | null> {
//     return AsyncStorage.getItem(Keys.INVITE_CODE);
//   }

//   static async setPushToken(token: PushToken): Promise<void> {
//     await AsyncStorage.setItem(Keys.PUSH_TOKEN, JSON.stringify(token));
//   }

//   static async clearPushToken(): Promise<void> {
//     await AsyncStorage.removeItem(Keys.PUSH_TOKEN);
//   }

//   static async getPushToken(): Promise<PushToken> {
//     let token;
//     try {
//       token = await AsyncStorage.getItem(Keys.PUSH_TOKEN);
//     } catch (error) {
//     } finally {
//       return token ? JSON.parse(token) : '';
//     }
//   }

//   static async setDocument(cpfCnpj: string): Promise<void> {
//     await AsyncStorage.setItem(Keys.DOCUMENT, cpfCnpj);
//   }

//   static async getDocument(): Promise<string | null> {
//     return await AsyncStorage.getItem(Keys.DOCUMENT);
//   }

//   static async setPassword(password: string): Promise<void> {
//     await AsyncStorage.setItem(Keys.PASSWORD, password);
//   }

//   static async getPassword(): Promise<string | null> {
//     return await AsyncStorage.getItem(Keys.PASSWORD);
//   }

//   static async clearSavedAuth(): Promise<void> {
//     await AsyncStorage.removeItem(Keys.DOCUMENT);
//     await AsyncStorage.removeItem(Keys.PASSWORD);
//   }

//   static async setLinkingRoute(
//     route: string,
//     routeType?: string,
//   ): Promise<void> {
//     if (!!route && !!routeType) {
//       const routeData = [Keys.LINKING_ROUTE, route];
//       const routeTypeData = [Keys.ROUTE_TYPE, routeType];

//       return AsyncStorage.multiSet([routeData, routeTypeData]);
//     }
//     await AsyncStorage.setItem(Keys.LINKING_ROUTE, JSON.stringify(route));
//     await AsyncStorage.removeItem(Keys.ROUTE_TYPE);
//   }

//   static async getLinkingRoute(): Promise<{
//     route: string;
//     routeType: string;
//   }> {
//     const values = await AsyncStorage.multiGet([
//       Keys.LINKING_ROUTE,
//       Keys.ROUTE_TYPE,
//     ]);

//     return { route: values[0][1] || '', routeType: values[1][1] || '' };
//   }

//   static async clearLinkingRoute(): Promise<void> {
//     await AsyncStorage.removeItem(Keys.LINKING_ROUTE);
//     await AsyncStorage.removeItem(Keys.ROUTE_TYPE);
//   }
// }
