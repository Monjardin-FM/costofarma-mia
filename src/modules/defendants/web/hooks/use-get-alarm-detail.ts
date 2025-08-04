import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getDefendantAlarmDetailService } from "../../infraestructure/services/get-defendant-alarm-detail";

export const useGetDefendantAlarmDetail = () => {
  const [
    { value: defendantAlarmDetail, loading, error },
    getDefendantAlarmDetail,
  ] = useAsyncFn<DefendantRepository["getAlarmDefendantDetail"]>(
    getDefendantAlarmDetailService,
    [getDefendantAlarmDetailService]
  );
  return {
    defendantAlarmDetail,
    loading,
    error,
    getDefendantAlarmDetail,
  };
};
