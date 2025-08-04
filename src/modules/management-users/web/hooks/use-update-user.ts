import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { updateUserService } from "./../../infraestructure/services/update-user";
import { useAsyncFn } from "react-use";

export const useUpdateUser = () => {
  const [{ value, error, loading }, updateUser] = useAsyncFn<
    UserManageRepository["updateUser"]
  >(updateUserService, [updateUserService]);
  return { value, updateUser, error, loading };
};
