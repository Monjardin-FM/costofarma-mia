import { useAppDispatch } from "../../../../utils/hooks/use-store";
import { signOut } from "../user.reducer";

export const useSignOut = () => {
  const dispatch = useAppDispatch();

  const execute = () => dispatch(signOut());

  return { execute };
};
