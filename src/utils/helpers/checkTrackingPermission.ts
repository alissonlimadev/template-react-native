import { getTrackingStatus, requestTrackingPermission } from '~/modules';
import { TRACKING_STATUS } from '~/utils/enums';

export const checkTrackingPermission = async (): Promise<boolean> => {
  let trackingStatus = await getTrackingStatus();
  if (trackingStatus === TRACKING_STATUS.NOT_DETERMINED) {
    trackingStatus = await requestTrackingPermission();
  }
  return (
    trackingStatus === TRACKING_STATUS.AUTHORIZED ||
    trackingStatus === TRACKING_STATUS.UNAVAILABLE
  );
};
