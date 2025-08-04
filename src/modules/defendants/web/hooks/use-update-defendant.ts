import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { updateDefendantService } from "../../infraestructure/services/update-defendant";

export const useUpdateDefendant = () => {
  const [{ value, error, loading }, updateDefendant] = useAsyncFn<
    DefendantRepository["updateDefendant"]
  >(updateDefendantService, [updateDefendantService]);
  return {
    value,
    updateDefendant,
    error,
    loading,
  };
};
