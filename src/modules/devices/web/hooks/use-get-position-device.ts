import { useAsyncFn } from "react-use";
import { DeviceRepository } from "../../domain/respositories/device-repository";
import { getPositionDeviceService } from "../../infraestructure/services/get-position-device";

export const useGetPositionDevice = () => {
  const [{ value: positionDevice, loading, error }, getPositionDevice] =
    useAsyncFn<DeviceRepository["getPositionDevice"]>(
      getPositionDeviceService,
      [getPositionDeviceService]
    );
  return {
    positionDevice,
    loading,
    error,
    getPositionDevice,
  };
};
