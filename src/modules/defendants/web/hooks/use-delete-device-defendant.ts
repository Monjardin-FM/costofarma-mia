import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { deleteDefendantDeviceService } from "../../infraestructure/services/delete-device-defendant";

export const useDeleteDefendantDevice = () => {
  const [{ value, error, loading }, deleteDefendantDevice] = useAsyncFn<
    DefendantRepository["deleteDeviceDefendant"]
  >(deleteDefendantDeviceService, [deleteDefendantDeviceService]);
  return {
    value,
    error,
    loading,
    deleteDefendantDevice,
  };
};
