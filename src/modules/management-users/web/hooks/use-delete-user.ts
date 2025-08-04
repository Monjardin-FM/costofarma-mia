import { useAsyncFn } from "react-use";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { deleteUserService } from "../../infraestructure/services/delete-user";

export const useDeleteUser = () => {
  const [{ value, error, loading }, deleteUser] = useAsyncFn<
    UserManageRepository["deleteUser"]
  >(deleteUserService, [deleteUserService]);
  return {
    value,
    error,
    loading,
    deleteUser,
  };
};
