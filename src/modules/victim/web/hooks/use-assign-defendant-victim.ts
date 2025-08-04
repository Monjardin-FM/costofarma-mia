import { useAsyncFn } from "react-use";
import { VictimRepository } from "../../domain/repositories/victim-repository";
import { assignDefendantVictimService } from "../../infraestructure/services/assign-defendant-victim";

export const useAssignDefendantVictim = () => {
  const [{ loading, error, value }, assignDefendantVictim] = useAsyncFn<
    VictimRepository["assignDefendantVictim"]
  >(assignDefendantVictimService, [assignDefendantVictimService]);
  return {
    assignDefendantVictim,
    loading,
    error,
    value,
  };
};
