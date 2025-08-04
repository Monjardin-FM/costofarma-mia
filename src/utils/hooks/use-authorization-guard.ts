import { useEffect, useState } from "react";
import { UserRole } from "../../modules/user/domain/entities/user-role";
import { useUser } from "../../modules/user/web/hooks/use-user";

export type UseAuthorizationGuardProps = {
  roles?: UserRole[];
};

export const useAuthorizationGuard = ({
  roles = [],
}: UseAuthorizationGuardProps) => {
  const { user } = useUser();
  const [isValid, setValid] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    const res = roles.some((item) => user?.roles.some((i: any) => i === item));
    setValid(res);
    setFetched(true);
  }, []);

  return [fetched, isValid];
};
