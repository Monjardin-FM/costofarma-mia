import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { getTrackingService } from "../../infraestructure/services/get-tracking";

export const useGetTracking = () => {
  const [{ value: tracking, loading, error }, getTracking] = useAsyncFn<
    TrackingRepository["getTracking"]
  >(getTrackingService, [getTrackingService]);
  return {
    tracking,
    loading,
    error,
    getTracking,
  };
};
