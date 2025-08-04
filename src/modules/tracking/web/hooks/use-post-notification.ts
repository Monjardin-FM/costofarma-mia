import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { postNotificationService } from "../../infraestructure/services/post-notification";

export const usePostNotification = () => {
  const [{ error, loading }, sendNotification] = useAsyncFn<
    TrackingRepository["postNofitication"]
  >(postNotificationService, [postNotificationService]);
  return {
    sendNotification,
    error,
    loading,
  };
};
