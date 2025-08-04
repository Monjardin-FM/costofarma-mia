import { useAsyncFn } from "react-use";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";
import { createAlarmService } from "../../infraestructure/services/post-alarm";

export const useCreateAlarm = () => {
  const [{ loading, error }, createAlarm] = useAsyncFn<
    AlarmRepository["createAlarm"]
  >(createAlarmService, [createAlarmService]);
  return {
    createAlarm,
    loading,
    error,
  };
};
