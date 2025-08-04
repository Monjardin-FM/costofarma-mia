import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getAddressByIdService } from "../../infraestructure/services/get-address-by-id";

export const useGetAddressById = () => {
  const [{ value: address, loading, error }, getAddressById] = useAsyncFn<
    DefendantRepository["getAddressById"]
  >(getAddressByIdService, [getAddressByIdService]);
  return {
    address,
    loading,
    error,
    getAddressById,
  };
};
