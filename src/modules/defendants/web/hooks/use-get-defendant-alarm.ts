import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getAlarmDefendantService } from "../../infraestructure/services/get-specific-alarm-defendant";

export const useGetDefendantAlarm = () => {
  const [{ value: defendantAlarm, loading, error }, getDefendantAlarm] =
    useAsyncFn<DefendantRepository["getSpecificAlarmDefendant"]>(
      getAlarmDefendantService,
      [getAlarmDefendantService]
    );
  return {
    defendantAlarm,
    loading,
    error,
    getDefendantAlarm,
  };
};
