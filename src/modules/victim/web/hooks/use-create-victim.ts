import { useAsyncFn } from "react-use";
import { VictimRepository } from "../../domain/repositories/victim-repository";
import { saveVictimService } from "../../infraestructure/services/create.victim";

export const useSaveVictim = () => {
  const [{ loading, error, value }, createVictim] = useAsyncFn<
    VictimRepository["createVictim"]
  >(saveVictimService, [saveVictimService]);
  return {
    createVictim,
    loading,
    error,
    value,
  };
};
