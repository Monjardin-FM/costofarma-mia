import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getScheduleAlarmsService } from "../../infraestructure/services/get-schedule-alarms";

export const useGetScheduleAlarms = () => {
  const [{ value: scheduleAlarms, loading, error }, getScheduleAlarms] =
    useAsyncFn<DefendantRepository["getScheduleAlarms"]>(
      getScheduleAlarmsService,
      [getScheduleAlarmsService]
    );
  return {
    scheduleAlarms,
    loading,
    error,
    getScheduleAlarms,
  };
};
