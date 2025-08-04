import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { updateDefendantDetailAlarmService } from "../../infraestructure/services/update-detail-alarm-defendant";

export const useUpdateAlarmDetailDefendant = () => {
  const [{ loading, error }, updateAlarmDetail] = useAsyncFn<
    DefendantRepository["updateAlarmDefendantDetail"]
  >(updateDefendantDetailAlarmService, [updateDefendantDetailAlarmService]);
  return {
    updateAlarmDetail,
    loading,
    error,
  };
};
