import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getCaseNumberService } from "../../infraestructure/services/get-case-number";

export const useGetCaseNumber = () => {
  const [{ value: caseNumber, loading, error }, getCaseNumber] = useAsyncFn<
    DefendantRepository["getCaseNumber"]
  >(getCaseNumberService, [getCaseNumberService]);
  return {
    caseNumber,
    loading,
    error,
    getCaseNumber,
  };
};
