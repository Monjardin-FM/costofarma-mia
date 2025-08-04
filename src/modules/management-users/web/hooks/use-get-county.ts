import { useAsyncFn } from "react-use";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { getCountyService } from "../../infraestructure/services/get-county";

export const useGetCounties = () => {
  const [{ value: counties, loading, error }, getCounties] = useAsyncFn<
    UserManageRepository["getCounty"]
  >(getCountyService, [getCountyService]);
  return {
    counties,
    loading,
    error,
    getCounties,
  };
};
