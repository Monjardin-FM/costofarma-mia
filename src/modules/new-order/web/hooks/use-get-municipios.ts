import { useAsyncFn } from "react-use";
import { AddressRepository } from "../../domain/repositories/address-repository";
import { getMunicipiosService } from "../../infraestructure/services/get-municipios";

export const useGetMunicipios = () => {
  const [{ value: municipios, loading, error }, getMunicipios] = useAsyncFn<
    AddressRepository["getMunicipios"]
  >(getMunicipiosService, [getMunicipiosService]);

  return {
    municipios,
    loading,
    error,
    getMunicipios,
  };
};
