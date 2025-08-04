import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { createCaseNumberService } from "../../infraestructure/services/create-case-number";

export const useCreateCaseNumber = () => {
  const [{ loading, error }, createCaseNumber] = useAsyncFn<
    DefendantRepository["createCaseNumber"]
  >(createCaseNumberService, [createCaseNumberService]);
  return {
    createCaseNumber,
    loading,
    error,
  };
};
