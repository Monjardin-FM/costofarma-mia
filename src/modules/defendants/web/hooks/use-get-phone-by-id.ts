import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getPhoneByIdService } from "../../infraestructure/services/get-phone-by-id";

export const useGetPhoneById = () => {
  const [{ value: phoneById, loading, error }, getPhoneById] = useAsyncFn<
    DefendantRepository["getPhoneById"]
  >(getPhoneByIdService, [getPhoneByIdService]);
  return {
    phoneById,
    loading,
    error,
    getPhoneById,
  };
};
