import { useAsyncFn } from "react-use";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { getUserByIdService } from "../../infraestructure/services/get-user-by-id";

export const useGetUserById = () => {
  const [{ value: user, loading, error }, getUserById] = useAsyncFn<
    UserManageRepository["getUserById"]
  >(getUserByIdService, [getUserByIdService]);
  return {
    user,
    loading,
    error,
    getUserById,
  };
};
