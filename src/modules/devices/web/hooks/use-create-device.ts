import { useAsyncFn } from "react-use";
import { DeviceRepository } from "../../domain/respositories/device-repository";
import { saveDeviceService } from "../../infraestructure/services/create-device";

export const useSaveDevice = () => {
  const [{ loading, error }, createDevice] = useAsyncFn<
    DeviceRepository["createDevice"]
  >(saveDeviceService, [saveDeviceService]);
  return {
    createDevice,
    loading,
    error,
  };
};
