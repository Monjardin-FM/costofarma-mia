import { useAsyncFn } from "react-use";
import { AddressRepository } from "../../domain/repositories/address-repository";
import { getEstadosService } from "../../infraestructure/services/get-estados";

export const useGetEstados = () => {
  const [{ value: estados, loading, error }, getEstados] = useAsyncFn<
    AddressRepository["getEstados"]
  >(getEstadosService, [getEstadosService]);

  return {
    estados,
    loading,
    error,
    getEstados,
  };
};
