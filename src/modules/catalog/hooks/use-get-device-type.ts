import { useAsyncFn } from 'react-use';
import { CatalogRepository } from '../domain/repositories/catalog-repository';
import { getDeviceTypeService } from '../infraestructure/services/get-device-type';

export const useGetDeviceType = () => {
  const [{ value: deviceType, loading, error }, getDeviceType] = useAsyncFn<
    CatalogRepository['getDeviceType']
  >(getDeviceTypeService, [getDeviceTypeService]);
  return {
    deviceType,
    loading,
    error,
    getDeviceType,
  };
};
