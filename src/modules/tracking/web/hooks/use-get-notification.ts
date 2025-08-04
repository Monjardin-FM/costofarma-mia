import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { getNotificationService } from "../../infraestructure/services/get-notification";

export const useGetNotification = () => {
  const [{ value: notification, loading, error }, getNotification] = useAsyncFn<
    TrackingRepository["getNotification"]
  >(getNotificationService, [getNotificationService]);
  return {
    notification,
    loading,
    error,
    getNotification,
  };
};
