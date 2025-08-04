import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { deleteAddressPersonService } from "../../infraestructure/services/delete-addres-person";

export const useDeleteAddressPerson = () => {
  const [{ value, error, loading }, deleteAddressPerson] = useAsyncFn<
    DefendantRepository["deleteAddressPerson"]
  >(deleteAddressPersonService, [deleteAddressPersonService]);
  return {
    value,
    error,
    loading,
    deleteAddressPerson,
  };
};
