import { useAsyncFn } from "react-use";
import { AseguradoraRepository } from "../../domain/repositories/aseguradora-repository";
import { getAseguradoraService } from "../../infraestructure/services/get-aseguradora";

export const useGetAseguradoras = () => {
  const [{ value: aseguradoras, loading, error }, getAseguradoras] = useAsyncFn<
    AseguradoraRepository["getAseguradoras"]
  >(getAseguradoraService, [getAseguradoraService]);

  return {
    aseguradoras,
    loading,
    error,
    getAseguradoras,
  };
};
