import { useAsyncFn } from "react-use";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";
import { updateAlarmService } from "../../infraestructure/services/update-alarm";

export const useUpdateAlarm = () => {
  const [{ loading, error }, updateAlarm] = useAsyncFn<
    AlarmRepository["updateAlarm"]
  >(updateAlarmService, [updateAlarmService]);
  return {
    updateAlarm,
    loading,
    error,
  };
};
