import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { deleteScheduleAlarmService } from "../../infraestructure/services/delete-schedule-alarm";

export const useDeleteScheduleAlarm = () => {
  const [{ loading, error }, deleteScheduleAlarm] = useAsyncFn<
    DefendantRepository["deleteScheduleAlarm"]
  >(deleteScheduleAlarmService, [deleteScheduleAlarmService]);
  return {
    loading,
    error,
    deleteScheduleAlarm,
  };
};
