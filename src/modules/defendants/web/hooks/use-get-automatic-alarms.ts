import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getDefendantAutomaticAlarmsService } from "../../infraestructure/services/get-defendant-automatic-alarms";

export const useGetAutomaticDefendantAlarm = () => {
  const [
    { value: automaticDefendantAlarm, loading, error },
    getAutomaticDefendantAlarm,
  ] = useAsyncFn<DefendantRepository["getDefendantAlarms"]>(
    getDefendantAutomaticAlarmsService,
    [getDefendantAutomaticAlarmsService]
  );
  return {
    automaticDefendantAlarm,
    loading,
    error,
    getAutomaticDefendantAlarm,
  };
};
