import { ReactNode } from "react";
import { Navigate } from "react-router";
import { UserRole } from "../../../modules/user/domain/entities/user-role";
import { useAuthorizationGuard } from "../../../utils/hooks/use-authorization-guard";

export type AppAuthorizationGuardProps = {
  children?: ReactNode;
  roles?: UserRole[];
  redirect?: {
    to?: string;
  };
};

export const AppAuthorizationGuard = ({
  children,
  roles = [],
  redirect,
}: AppAuthorizationGuardProps) => {
  const [fetched, isValid] = useAuthorizationGuard({
    roles,
  });

  return (
    <>
      {fetched && (
        <>
          {!redirect?.to && isValid && children}
          {redirect?.to && (
            <>{isValid ? children : <Navigate to={redirect.to} />}</>
          )}
        </>
      )}
    </>
  );
};
