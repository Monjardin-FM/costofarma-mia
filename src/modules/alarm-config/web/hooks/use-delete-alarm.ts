import { useAsyncFn } from "react-use";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";
import { deleteAlarmService } from "../../infraestructure/services/delete-alarm";

export const useDeleteAlarm = () => {
  const [{ value, error, loading }, deleteAlarm] = useAsyncFn<
    AlarmRepository["deleteAlarmType"]
  >(deleteAlarmService, [deleteAlarmService]);
  return {
    value,
    error,
    loading,
    deleteAlarm,
  };
};
