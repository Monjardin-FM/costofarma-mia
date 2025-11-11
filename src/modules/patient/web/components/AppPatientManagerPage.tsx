import { Button } from "@nextui-org/react";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppPatientHeader } from "./AppPatientHeader";
import { AppCreatePatientModal } from "./modals/AppCreatePatientModal";
import { useState } from "react";

export const AppPatientManagerPage = () => {
  const [isCreatePatientModalVisible, setCreatePatientModalVisible] =
    useState(false);
  return (
    <AppAuthorizationGuard
      redirect={{ to: "/" }}
      roles={
        AppConfig["masterPatient.managementPage.authorization"] as UserRole[]
      }
    >
      <AppCreatePatientModal
        isVisible={isCreatePatientModalVisible}
        onClose={() => setCreatePatientModalVisible(false)}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5 ">
          <AppPatientHeader />
          <div className="w-full flex justify-end my-5 px-4">
            <Button
              color="success"
              onClick={() => setCreatePatientModalVisible(true)}
            >
              Agregar Paciente
            </Button>
          </div>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
