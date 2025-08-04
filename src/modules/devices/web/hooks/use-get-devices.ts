import { DeviceRepository } from "../../domain/respositories/device-repository";
import { useAsyncFn } from "react-use";
import { getDevicesService } from "../../infraestructure/services/get-devices";

export const useGetDevices = () => {
  const [{ value: devices, loading, error }, getDevices] = useAsyncFn<
    DeviceRepository["getDevice"]
  >(getDevicesService, [getDevicesService]);
  return {
    devices,
    loading,
    error,
    getDevices,
  };
};
