import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { checkNotificationService } from "../../infraestructure/services/check-notification";

export const useCheckNotification = () => {
  const [{ error, loading }, checkNotification] = useAsyncFn<
    TrackingRepository["checkNotification"]
  >(checkNotificationService, [checkNotificationService]);
  return {
    checkNotification,
    error,
    loading,
  };
};
