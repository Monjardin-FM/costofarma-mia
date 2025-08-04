import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { assignDeviceDefendantService } from "../../infraestructure/services/assign-device-defendant";

export const useAssignDeviceDefendant = () => {
  const [{ loading, error }, assignDeviceDefendant] = useAsyncFn<
    DefendantRepository["assignDeviceDefendant"]
  >(assignDeviceDefendantService, [assignDeviceDefendantService]);
  return {
    assignDeviceDefendant,
    loading,
    error,
  };
};
