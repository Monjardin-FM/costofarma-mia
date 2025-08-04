import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { createScheduleAlarmDefendantService } from "../../infraestructure/services/create-schedule-alarm-defendant";

export const useCreatetScheduleAlarmDefendant = () => {
  const [{ loading, error }, createScheduleAlarmDefendant] = useAsyncFn<
    DefendantRepository["postScheduleAlarmDefendant"]
  >(createScheduleAlarmDefendantService, [createScheduleAlarmDefendantService]);
  return {
    loading,
    error,
    createScheduleAlarmDefendant,
  };
};
