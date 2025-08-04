import { useAsyncFn } from "react-use";
import { VictimRepository } from "../../domain/repositories/victim-repository";
import { getVictimByMailService } from "../../infraestructure/services/get-victim-by-mail";

export const useGetVictimByMail = () => {
  const [{ value: victimMail, loading, error }, getVictimByMail] = useAsyncFn<
    VictimRepository["getVictimByMail"]
  >(getVictimByMailService, [getVictimByMailService]);
  return {
    victimMail,
    loading,
    error,
    getVictimByMail,
  };
};
