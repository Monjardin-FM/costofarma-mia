import { getDefendantDeviceService } from "./../../infraestructure/services/get-defendant-device";
import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const useGetDefendantDevice = () => {
  const [{ value: defendantDevice, loading, error }, getDefendantDevice] =
    useAsyncFn<DefendantRepository["getDeviceDefendant"]>(
      getDefendantDeviceService,
      [getDefendantDeviceService]
    );
  return {
    defendantDevice,
    loading,
    error,
    getDefendantDevice,
  };
};
