import { useAppSelector } from "../../../../utils/hooks/use-store";
import { useSignIn } from "./use-signin";
import { useSignOut } from "./use-signout";

export const useUser = () => {
  const { value, error, loading } = useAppSelector((state) => state.user);
  const signIn = useSignIn();
  const signOut = useSignOut();
  return {
    signIn,
    signOut,
    user: value,
    loading: loading,
    error: error,
  };
};
