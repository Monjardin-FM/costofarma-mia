import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { deleteCaseNumberService } from "../../infraestructure/services/delete-case-number";

export const useDeleteCaseNumber = () => {
  const [{ value, error, loading }, deleteCaseNumber] = useAsyncFn<
    DefendantRepository["deleteCaseNumber"]
  >(deleteCaseNumberService, [deleteCaseNumberService]);
  return {
    value,
    error,
    loading,
    deleteCaseNumber,
  };
};
