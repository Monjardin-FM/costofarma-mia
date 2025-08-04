import { useAsyncFn } from 'react-use';
import { CatalogRepository } from '../domain/repositories/catalog-repository';
import { getResponseDevicesService } from '../infraestructure/services/get-response-devices';

export const useGetResponsiveDevices = () => {
  const [{ value: responsiveDevices, loading, error }, getResponsiveDevices] =
    useAsyncFn<CatalogRepository['getResponseDevices']>(
      getResponseDevicesService,
      [getResponseDevicesService],
    );
  return {
    responsiveDevices,
    loading,
    error,
    getResponsiveDevices,
  };
};
