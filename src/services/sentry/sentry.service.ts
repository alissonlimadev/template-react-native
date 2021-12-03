// import * as Sentry from '@sentry/react-native';
// import { Env, getTrackingStatus, requestTrackingPermission } from '~/modules';
// import { TRACKING_STATUS } from '~/utils';

// const isPRD = Env.ENV === 'PRD';
// export default class SentryService {
//   static init(): void {
//     if (__DEV__) return;
//     Sentry.init({
//       dsn: Env.SENTRY_DSN,
//       environment: isPRD ? 'production' : 'homolog',
//     });
//   }

//   static async setUser(user: UserData): Promise<void> {
//     if (__DEV__) return;
//     let trackingStatus = await getTrackingStatus();
//     if (trackingStatus === TRACKING_STATUS.NOT_DETERMINED) {
//       trackingStatus = await requestTrackingPermission();
//     }
//     if (
//       trackingStatus === TRACKING_STATUS.AUTHORIZED ||
//       trackingStatus === TRACKING_STATUS.UNAVAILABLE
//     ) {
//       Sentry.setUser({
//         email: user.email,
//       });
//     }
//   }
// }
