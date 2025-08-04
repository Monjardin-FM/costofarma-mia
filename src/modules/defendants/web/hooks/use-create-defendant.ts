import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { createDefendantService } from "../../infraestructure/services/create-defendant";

export const useCreateDefendant = () => {
  const [{ value, loading, error }, createDefendant] = useAsyncFn<
    DefendantRepository["createDefendant"]
  >(createDefendantService, [createDefendantService]);

  return {
    value,
    createDefendant,
    loading,
    error,
  };
};
