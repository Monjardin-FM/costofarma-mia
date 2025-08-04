import { useAsyncFn } from "react-use";
import { VictimRepository } from "../../domain/repositories/victim-repository";
import { deleteVictimService } from "../../infraestructure/services/delete-victim";

export const useDeleteVictim = () => {
  const [{ value, error, loading }, deleteVictim] = useAsyncFn<
    VictimRepository["deleteVictim"]
  >(deleteVictimService, [deleteVictimService]);
  return {
    value,
    error,
    loading,
    deleteVictim,
  };
};
