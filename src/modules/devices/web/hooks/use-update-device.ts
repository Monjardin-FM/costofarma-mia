import { DeviceRepository } from "../../domain/respositories/device-repository";

import { useAsyncFn } from "react-use";
import { updateDeviceService } from "../../infraestructure/services/update.device";

export const useUpdateDevice = () => {
  const [{ error, loading }, updateDevice] = useAsyncFn<
    DeviceRepository["updateDevice"]
  >(updateDeviceService, [updateDeviceService]);
  return {
    updateDevice,
    error,
    loading,
  };
};
