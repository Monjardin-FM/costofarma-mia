import AppConfig from "../../../../settings.json";
import { AppRequestAdminHeader } from "./app-request-admin-header";
import { AppRequestAdminsTable } from "./tables/app-request-admin-table";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";

export const AppRequestAdminManagerPage = () => {
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig["userManagement.managerPage.authorization"] as UserRole[]
      }
      redirect={{ to: "/" }}
    >
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppRequestAdminHeader />
        </div>
        <div className="container mx-auto mt-5">
          <AppRequestAdminsTable onEdit={() => {}} />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
