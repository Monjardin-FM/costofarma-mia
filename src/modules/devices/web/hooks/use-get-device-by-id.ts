import { DeviceRepository } from "../../domain/respositories/device-repository";
import { useAsyncFn } from "react-use";
import { getDeviceByIdService } from "../../infraestructure/services/get-device-by-id";

export const useGetDeviceById = () => {
  const [{ value: device, loading, error }, getDeviceById] = useAsyncFn<
    DeviceRepository["getDeviceById"]
  >(getDeviceByIdService, [getDeviceByIdService]);
  return {
    device,
    loading,
    error,
    getDeviceById,
  };
};
