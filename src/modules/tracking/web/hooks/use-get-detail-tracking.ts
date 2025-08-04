import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { getTrackingDetailService } from "../../infraestructure/services/get-tracking-detail";

export const useGetDetailTracking = () => {
  const [{ value: trackingDetail, loading, error }, getTrackingDetail] =
    useAsyncFn<TrackingRepository["getTrackingDetail"]>(
      getTrackingDetailService,
      [getTrackingDetailService]
    );
  return {
    trackingDetail,
    loading,
    error,
    getTrackingDetail,
  };
};
