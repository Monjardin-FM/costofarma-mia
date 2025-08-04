import { useAsyncFn } from "react-use";
import { TrackingPlusRepository } from "../../domain/respository/tracking-plus-repository";
import { getTrackingPlusService } from "../../infraestructure/services/get-tracking-plus";

export const useGetTrackingPlus = () => {
  const [{ value: trackingPlus, loading, error }, getTrackingPlus] = useAsyncFn<
    TrackingPlusRepository["getTrackingPlus"]
  >(getTrackingPlusService, [getTrackingPlusService]);
  return {
    trackingPlus,
    loading,
    error,
    getTrackingPlus,
  };
};
