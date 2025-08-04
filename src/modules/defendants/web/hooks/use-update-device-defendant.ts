import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { updateDeviceDefendantService } from "../../infraestructure/services/update-device-defendants";

export const useUpdateDeviceDefendant = () => {
  const [{ value, error, loading }, updateDeviceDefendant] = useAsyncFn<
    DefendantRepository["updateDeviceDefendant"]
  >(updateDeviceDefendantService, [updateDeviceDefendantService]);
  return {
    value,
    updateDeviceDefendant,
    error,
    loading,
  };
};
