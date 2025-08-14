import { useAsyncFn } from "react-use";
import { AddressRepository } from "../../domain/repositories/address-repository";
import { getColoniasService } from "../../infraestructure/services/get-colonias";

export const useGetColonias = () => {
  const [{ value: colonias, loading, error }, getColonias] = useAsyncFn<
    AddressRepository["getColonias"]
  >(getColoniasService, [getColoniasService]);

  return {
    colonias,
    loading,
    error,
    getColonias,
  };
};
