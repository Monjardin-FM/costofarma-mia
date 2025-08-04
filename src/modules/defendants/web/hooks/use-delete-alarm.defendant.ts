import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { deleteDefendantAlarmService } from "../../infraestructure/services/delete-alarm-defendant";

export const useDeleteDefendantAlarm = () => {
  const [{ value, error, loading }, deleteDefendantAlarm] = useAsyncFn<
    DefendantRepository["deleteSpecificAlarmDefendant"]
  >(deleteDefendantAlarmService, [deleteDefendantAlarmService]);
  return {
    value,
    error,
    loading,
    deleteDefendantAlarm,
  };
};
