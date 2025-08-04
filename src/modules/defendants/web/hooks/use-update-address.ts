import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { updateAddressService } from "../../infraestructure/services/edit-address";

export const useUpdateAddress = () => {
  const [{ error, loading }, updateAddress] = useAsyncFn<
    DefendantRepository["editAddressPerson"]
  >(updateAddressService, [updateAddressService]);
  return {
    updateAddress,
    error,
    loading,
  };
};
