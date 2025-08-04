import { useAsyncFn } from "react-use";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";
import { getAlarmsService } from "../../infraestructure/services/get-alarm";

export const useGetAlarms = () => {
  const [{ value: alarms, loading, error }, getAlarms] = useAsyncFn<
    AlarmRepository["getAlarms"]
  >(getAlarmsService, [getAlarmsService]);
  return {
    alarms,
    loading,
    error,
    getAlarms,
  };
};
