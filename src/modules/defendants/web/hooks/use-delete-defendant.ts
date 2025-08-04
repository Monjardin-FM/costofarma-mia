import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { deleteDefendantService } from "../../infraestructure/services/delete.defendant";

export const useDeleteDefendant = () => {
  const [{ value, error, loading }, deleteDefendant] = useAsyncFn<
    DefendantRepository["deleteDefendant"]
  >(deleteDefendantService, [deleteDefendantService]);
  return {
    value,
    error,
    loading,
    deleteDefendant,
  };
};
