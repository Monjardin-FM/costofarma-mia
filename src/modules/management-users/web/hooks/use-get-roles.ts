import { useAsyncFn } from "react-use";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { getRolesService } from "../../infraestructure/services/get-roles";

export const useGetRoles = () => {
  const [{ value: roles, loading, error }, getRoles] = useAsyncFn<
    UserManageRepository["getRole"]
  >(getRolesService, [getRolesService]);
  return {
    roles,
    loading,
    error,
    getRoles,
  };
};
