import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { updateCaseNumberService } from "../../infraestructure/services/update-case-number";

export const useUpdateCaseNumber = () => {
  const [{ loading, error }, updateCaseNumber] = useAsyncFn<
    DefendantRepository["updateCaseNumber"]
  >(updateCaseNumberService, [updateCaseNumberService]);
  return {
    updateCaseNumber,
    loading,
    error,
  };
};
