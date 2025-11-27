import { Button } from "@nextui-org/react";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppPatientHeader } from "./AppPatientHeader";
import { AppCreatePatientModal } from "./modals/AppCreatePatientModal";
import { useEffect, useState } from "react";
import { useGetPerson } from "../../../orders/web/hooks/use-get-person";
import { PersonTable } from "../../../orders/web/components/table/OrderPersonTable";

export const AppPatientManagerPage = () => {
  const { getPerson, person } = useGetPerson();
  const [search, setSearch] = useState<string>("");
  const [isCreatePatientModalVisible, setCreatePatientModalVisible] =
    useState(false);
  const onSearch = (search: string) => {
    getPerson({ rfc: search });
  };
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onSearch(search);
      }, 50);
      return () => clearTimeout(timeDelay);
    }
  }, [search]);
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
          <AppPatientHeader
            onSearch={onSearch}
            search={search}
            setSearch={setSearch}
          />
          <div className="w-full flex justify-end my-5 px-4">
            <Button
              color="success"
              onPress={() => setCreatePatientModalVisible(true)}
            >
              Crear Paciente
            </Button>
          </div>
          <div className="container mx-auto mb-10">
            <PersonTable
              items={person ? [person] : []}
              onSelectPerson={() => {
                // onSelectHandler(record.record.idPersona);
              }}
            />
          </div>
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
