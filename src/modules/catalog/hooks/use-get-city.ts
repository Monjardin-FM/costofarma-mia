import { useAsyncFn } from 'react-use';
import { CatalogRepository } from '../domain/repositories/catalog-repository';
import { getCityService } from '../infraestructure/services/get-city';

export const useGetCity = () => {
  const [{ value: cities, loading, error }, getCities] = useAsyncFn<
    CatalogRepository['getCities']
  >(getCityService, [getCityService]);
  return {
    cities,
    loading,
    error,
    getCities,
  };
};
