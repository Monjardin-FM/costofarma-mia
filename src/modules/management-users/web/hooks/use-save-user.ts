import { useAsyncFn } from "react-use";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";
import { saveUserService } from "../../infraestructure/services/save-user";

export const useSaveUser = () => {
  const [{ value, loading, error }, createUser] = useAsyncFn<
    UserManageRepository["saveUser"]
  >(saveUserService, [saveUserService]);
  return { value, createUser, loading, error };
};
