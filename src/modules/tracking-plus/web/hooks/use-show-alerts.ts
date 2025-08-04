import { useAsyncFn } from "react-use";
import { TrackingPlusRepository } from "../../domain/respository/tracking-plus-repository";
import { showAlertsService } from "../../infraestructure/services/show-alerts-";

export const useShowAlerts = () => {
  const [{ loading, error }, showAlerts] = useAsyncFn<
    TrackingPlusRepository["showAlerts"]
  >(showAlertsService, [showAlertsService]);
  return {
    loading,
    error,
    showAlerts,
  };
};
