import { useAsyncFn } from "react-use";
import { DeviceRepository } from "../../domain/respositories/device-repository";
import { getHistoricPositionDeviceService } from "../../infraestructure/services/get-historic-position-device";

export const useGetHistoricPositionDevice = () => {
  const [
    { value: historicPositionDevice, loading, error },
    getHistoricPositionDevice,
  ] = useAsyncFn<DeviceRepository["getHistoricPositionDevice"]>(
    getHistoricPositionDeviceService,
    [getHistoricPositionDeviceService]
  );
  return {
    historicPositionDevice,
    loading,
    error,
    getHistoricPositionDevice,
  };
};
