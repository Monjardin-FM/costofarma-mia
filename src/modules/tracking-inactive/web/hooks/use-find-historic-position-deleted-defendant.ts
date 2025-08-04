import { useAsyncFn } from "react-use";
import { DefendantInactiveRepository } from "../../domain/repositories/defendant-inactive-repository";
import { findHistoricPositionDeletedDefendantService } from "../../infraestructure/services/find-historic-position-deleted-defendant";

export const useFindHistoricDeletedDefendantPosition = () => {
  const [
    { value: historicPosition, loading, error },
    findHistoricDeltededDefendantPosition,
  ] = useAsyncFn<
    DefendantInactiveRepository["getHistoricPositionInactiveDefendant"]
  >(findHistoricPositionDeletedDefendantService, [
    findHistoricPositionDeletedDefendantService,
  ]);
  return {
    historicPosition,
    findHistoricDeltededDefendantPosition,
    loading,
    error,
  };
};
