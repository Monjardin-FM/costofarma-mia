import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { assignAddressService } from "../../infraestructure/services/assign-address-defendant";

export const useAssignAddress = () => {
  const [{ loading, error }, assignAddress] = useAsyncFn<
    DefendantRepository["assignAddress"]
  >(assignAddressService, [assignAddressService]);
  return {
    assignAddress,
    loading,
    error,
  };
};
