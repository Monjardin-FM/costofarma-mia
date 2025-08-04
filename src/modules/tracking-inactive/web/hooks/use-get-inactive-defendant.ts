import { useAsyncFn } from "react-use";
import { DefendantInactiveRepository } from "../../domain/repositories/defendant-inactive-repository";
import { getInactiveDefendantsService } from "../../infraestructure/services/get-inactive-defendants";

export const useGetInactiveDefendants = () => {
  const [{ value: inactiveDefendants, loading, error }, getInactiveDefendants] =
    useAsyncFn<DefendantInactiveRepository["getDefendantInactive"]>(
      getInactiveDefendantsService,
      [getInactiveDefendantsService]
    );
  return {
    inactiveDefendants,
    loading,
    error,
    getInactiveDefendants,
  };
};
