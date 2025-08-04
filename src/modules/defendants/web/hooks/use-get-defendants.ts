import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getDefendantsService } from "../../infraestructure/services/get-defendant";

export const useGetDefendants = () => {
  const [{ value: defendants, loading, error }, getDefendants] = useAsyncFn<
    DefendantRepository["getDefendant"]
  >(getDefendantsService, [getDefendantsService]);
  return {
    defendants,
    loading,
    error,
    getDefendants,
  };
};
