import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getDefendantByIdService } from "../../infraestructure/services/get-defendant-by-id";

export const useGetDefendantsById = () => {
  const [{ value: defendant, loading, error }, getDefendantById] = useAsyncFn<
    DefendantRepository["getDefendantById"]
  >(getDefendantByIdService, [getDefendantByIdService]);
  return {
    defendant,
    loading,
    error,
    getDefendantById,
  };
};
