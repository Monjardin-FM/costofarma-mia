import { DeviceRepository } from "../../domain/respositories/device-repository";
import { useAsyncFn } from "react-use";
import { deleteDeviceService } from "../../infraestructure/services/delete-device";

export const useDeleteDevice = () => {
  const [{ value, error, loading }, deleteDevice] = useAsyncFn<
    DeviceRepository["deleteDevice"]
  >(deleteDeviceService, [deleteDeviceService]);
  return {
    value,
    error,
    loading,
    deleteDevice,
  };
};
