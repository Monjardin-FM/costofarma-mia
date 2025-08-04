import { useAsyncFn } from "react-use";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";
import { getAlarmByIdService } from "../../infraestructure/services/get-alarm-by-id";

export const useGetAlarmById = () => {
  const [{ value: alarm, loading, error }, getAlarmById] = useAsyncFn<
    AlarmRepository["getAlarmById"]
  >(getAlarmByIdService, [getAlarmByIdService]);
  return {
    alarm,
    loading,
    error,
    getAlarmById,
  };
};
