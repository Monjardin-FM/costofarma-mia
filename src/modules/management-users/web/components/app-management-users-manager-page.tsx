import { useEffect, useState } from "react";
import AppConfig from "../../../../settings.json";
import { AppManagemenetUsersHeader } from "./app-management-users-header";
import { AppManagementUsersTable } from "./tables/app-management-users-table";
import { useToggle } from "react-use";
import { AppNewUserModal } from "./modals/app-new-user-modal";
import { useGetUsers } from "../hooks/use-get-users";
import { AppEditUserModal } from "./modals/app-edit-user-modal";
import { useDeleteUser } from "../hooks/use-delete-user";
import { AppToast } from "../../../../presentation/Components/AppToast";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppLoading } from "../../../../presentation/Components/AppLoading";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import * as Icon from "react-feather";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
export const ManagementUsersManagerPage = () => {
  // const [visibleNewUserModal, setVisibleNewUserModal] = useToggle(false);
  const { t: translation } = useTranslation("UsersManagement");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenEditUser,
    onOpen: onOpenUser,
    onOpenChange: onOpenChangeUser,
  } = useDisclosure();
  // const [visibleEditUserModal, setVisibleEditUserModal] = useToggle(false);
  const { users, getUsers, error, loading: loadingUsers } = useGetUsers();
  const [toggleReload, setToggleReload] = useToggle(false);
  const [userId, setUserId] = useState<number | null>(1);
  const {
    deleteUser,
    error: errorDelete,
    loading: loadingDeleteUser,
  } = useDeleteUser();
  const [search, setSearch] = useState<string>("");
  const onClick = (search: string) => {
    getUsers({ completeName: search });
  };
  const onDelete = () => {
    AppToast().fire({
      title: translation("ToastDeletedUser"),
      icon: "success",
      text: translation("ToasDeletedUserText"),
    });
  };
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onClick(search);
      }, 500);
      return () => clearTimeout(timeDelay);
    }
  }, [search, toggleReload]);
  useEffect(() => {
    if (error) {
      AppToast().fire({ title: "Error" });
    }
  }, [error]);
  useEffect(() => {
    getUsers({ completeName: "" });
  }, [toggleReload]);
  useEffect(() => {
    if (errorDelete) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorDeleteUserText"),
      });
    }
  }, [errorDelete]);
  useEffect(() => {
    if (loadingDeleteUser) {
      AppToast().fire({
        title: translation("ToastLoadingDeleteUser"),
        text: translation("ToastLoadingDeleteUserText"),
        icon: "info",
      });
    }
  }, [loadingDeleteUser]);
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig["userManagement.managerPage.authorization"] as UserRole[]
      }
      redirect={{ to: "/" }}
    >
      {!users && <AppLoading />}
      <AppNewUserModal
        isVisible={isOpen}
        onOpenChange={onOpenChange}
        // onClose={() => setVisibleNewUserModal(false)}
        onReload={() => setToggleReload(!toggleReload)}
        translation={translation}
      />
      <AppEditUserModal
        isVisible={isOpenEditUser}
        // onClose={() => setVisibleEditUserModal(false)}
        onOpenChangeUser={onOpenChangeUser}
        onReload={() => setToggleReload(!toggleReload)}
        idUser={userId}
        translation={translation}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppManagemenetUsersHeader
            onClick={onClick}
            loadingUsers={loadingUsers}
            search={search}
            setSearch={setSearch}
            translation={translation}
          />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <Tooltip
            content={translation("TooltipNewUser")}
            color="warning"
            offset={1}
            showArrow
            closeDelay={10}
            style={{
              zIndex: 0,
            }}
            disableAnimation
          >
            <Button
              color="warning"
              // onClick={() => setVisibleNewUserModal(true)}
              onPress={onOpen}
              isIconOnly
              size="md"
            >
              <Icon.PlusCircle color="white" />
            </Button>
          </Tooltip>
        </div>
        <div className="container mx-auto mt-5 mb-16">
          <AppManagementUsersTable
            loadingDeleteUser={loadingDeleteUser}
            onDelete={async (record) => {
              await deleteUser({ idPerson: record.record.idPerson });
              if (!errorDelete) onDelete();
              setToggleReload(!toggleReload);
            }}
            onEdit={({ record }) => {
              setUserId(record.idPerson);
              onOpenUser();
            }}
            items={users}
            translation={translation}
          />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
