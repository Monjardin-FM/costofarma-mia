import { useAsyncFn } from "react-use";
import { VictimRepository } from "../../domain/repositories/victim-repository";
import { getVictimsService } from "../../infraestructure/services/get-victims";

export const useGetVictims = () => {
  const [{ value: victims, loading, error }, getVictims] = useAsyncFn<
    VictimRepository["getVictimDefendant"]
  >(getVictimsService, [getVictimsService]);
  return {
    victims,
    loading,
    error,
    getVictims,
  };
};
