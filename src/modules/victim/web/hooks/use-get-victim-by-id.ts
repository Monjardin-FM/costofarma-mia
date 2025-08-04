import { useAsyncFn } from "react-use";
import { VictimRepository } from "../../domain/repositories/victim-repository";
import { getVictimByIdService } from "../../infraestructure/services/get-victim-by-id";

export const useGetVictimById = () => {
  const [{ value: victim, loading, error }, getVictimById] = useAsyncFn<
    VictimRepository["getVictimById"]
  >(getVictimByIdService, [getVictimByIdService]);
  return {
    victim,
    loading,
    error,
    getVictimById,
  };
};
