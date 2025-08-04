import { useAsyncFn } from "react-use";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { getGendersService } from "../../infraestructure/services/get-genders";

export const useGetGenders = () => {
  const [{ value: genders, loading, error }, getGenders] = useAsyncFn<
    UserManageRepository["getGender"]
  >(getGendersService, [getGendersService]);
  return {
    genders,
    loading,
    error,
    getGenders,
  };
};
