import { useAsyncFn } from "react-use";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { getUsersService } from "../../infraestructure/services/get-users";

export const useGetUsers = () => {
  const [{ value: users, loading, error }, getUsers] = useAsyncFn<
    UserManageRepository["getUsers"]
  >(getUsersService, [getUsersService]);
  return {
    users,
    loading,
    error,
    getUsers,
  };
};
