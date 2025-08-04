import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getAlarmDefendantByIdService } from "../../infraestructure/services/get-specific-alarm-defendant-by-id";

export const useGetDefendantAlarmById = () => {
  const [{ value: defendantAlarmById, loading, error }, getDefendantAlarmById] =
    useAsyncFn<DefendantRepository["getSpecificAlarmById"]>(
      getAlarmDefendantByIdService,
      [getAlarmDefendantByIdService]
    );
  return {
    defendantAlarmById,
    loading,
    error,
    getDefendantAlarmById,
  };
};
