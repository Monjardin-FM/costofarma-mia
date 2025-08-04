import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { UserManage } from "../../../domain/entities/userManage";
import * as Icon from "react-feather";
import { TFunction } from "i18next";
// import dayjs from "dayjs";
// import { useEffect, useState } from "react";

export type ManagementUsersTableProps = {
  items?: UserManage[];
  onEdit: (params: RenderFnParams<UserManage>) => void;
  onDelete: (params: RenderFnParams<UserManage>) => void;
  loadingDeleteUser: boolean;
  translation: TFunction<[string], undefined>;
};
const getRandomColorSchema = (params: { length: number }) => {
  const colors: UIColorScheme[] = [
    "gray",
    "primary",
    "success",
    "info",
    "warn",
    "red",
  ];
  return colors[params.length % colors.length] || "gray";
};

const NamUserColumn = (params: RenderFnParams<UserManage>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.name.length,
          })}
        >
          <Icon.User size={20} />
        </AppAvatar>
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="font-semibold tracking-wider">
          {`${params.record.name} ${params.record.lastName}`}
        </span>
        {/* <Chip color="primary" variant="dot" radius="md">
          <span className="text-xs">
            {dayjs(dayjs(params.record.birthDate).toDate()).format(
              "DD-MM-YYYY"
            )}
          </span>
        </Chip> */}
        <Chip color="primary" variant="shadow" radius="md">
          <span className="text-xs">{params.record.userName}</span>
        </Chip>
      </div>
    </div>
  );
};

const RoleUserColumn = (params: RenderFnParams<UserManage>) => {
  return (
    <Chip color="success" variant="shadow">
      {params.record.role}
    </Chip>
  );
};

const EmailUserColumn = (params: RenderFnParams<UserManage>) => {
  return (
    <Chip color="warning" variant="shadow">
      {params.record.eMail}
    </Chip>
  );
};

const ActionsColumn = ({
  onEdit,
  // record,
  loadingDeleteUser,
  onDelete,
  translation,
}: RenderFnParams<UserManage> & {
  onEdit: () => void;
  onDelete: () => void;
  loadingDeleteUser: boolean;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <Tooltip
        content={translation("TooltipEditUser")}
        color="primary"
        style={{
          zIndex: 0,
        }}
        offset={1}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onEdit();
          }}
          title="Edit User"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDeleteUser")}
        color="danger"
        style={{
          zIndex: 0,
        }}
        offset={1}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onDelete();
          }}
          title="Delete User"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDeleteUser}
          // isLoading={loadingDeleteUser}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppManagementUsersTable = ({
  items = [],
  onEdit,
  onDelete,
  loadingDeleteUser,
  translation,
}: ManagementUsersTableProps) => {
  const columns: AppDataGridColumn<UserManage>[] = [
    {
      key: "userName",
      dataIndex: "userName",
      title: translation("NameUserColumn"),
      render: NamUserColumn,
    },
    {
      key: "roleUser",
      dataIndex: "roleUser",
      title: translation("RoleUserColumn"),
      render: RoleUserColumn,
    },
    {
      key: "emailUser",
      dataIndex: "emailUser",
      title: translation("EmailUserColumn"),
      render: EmailUserColumn,
    },
    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ActionColumn"),
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          loadingDeleteUser: loadingDeleteUser,
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<UserManage>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
