import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { assignAlarmDefendantService } from "../../infraestructure/services/assign-alarm-defendant";

export const useAssignAlarmDefendant = () => {
  const [{ loading, error }, assignAlarmDefendant] = useAsyncFn<
    DefendantRepository["assignAlarmDefendant"]
  >(assignAlarmDefendantService, [assignAlarmDefendantService]);
  return {
    assignAlarmDefendant,
    loading,
    error,
  };
};
