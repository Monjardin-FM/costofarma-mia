import { useAsyncFn } from "react-use";
import { VictimRepository } from "../../domain/repositories/victim-repository";
import { updateVictimService } from "../../infraestructure/services/update-victim";

export const useUpdateVictim = () => {
  const [{ value, error, loading }, updateVictim] = useAsyncFn<
    VictimRepository["updateVictim"]
  >(updateVictimService, [updateVictimService]);
  return { value, updateVictim, error, loading };
};
