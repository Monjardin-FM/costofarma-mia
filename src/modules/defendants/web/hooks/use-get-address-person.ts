import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getAddressPersonService } from "../../infraestructure/services/get-address-person";

export const useGetAddressPerson = () => {
  const [{ value: addressPerson, loading, error }, getAddressPerson] =
    useAsyncFn<DefendantRepository["getAddressPerson"]>(
      getAddressPersonService,
      [getAddressPersonService]
    );
  return {
    addressPerson,
    loading,
    error,
    getAddressPerson,
  };
};
