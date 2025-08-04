import * as Icon from "react-feather";
import { RequestAdmin } from "../../../domain/entities/request-admin";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { AppBadge } from "../../../../../presentation/Components/AppBadge";
import { AppButton } from "../../../../../presentation/Components/AppButton";
import { AppTooltip } from "../../../../../presentation/Components/AppTooltip";

export type RequestAdminsTableProps = {
  // onToggleStatus?: (index: Client) => void;
  // onUpdateClient: (data: Client) => void;
  items?: RequestAdmin[];
  onEdit: (params: RenderFnParams<RequestAdmin>) => void;
  // onNotification: (params: RenderFnParams<UserManage>) => void;
  // onUpdateAlmacen: (params: RenderFnParams<UserManage>) => void;
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
const NumberRequestAdminColumn = (params: RenderFnParams<RequestAdmin>) => {
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
      <AppBadge>
        <div className="font-semibold text-sm text-primary-600 tracking-wider">
          {params.record.idNumber}
        </div>
      </AppBadge>
    </div>
  );
};
const OfficerRequestAdminColumn = (params: RenderFnParams<RequestAdmin>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <div className="font-semibold tracking-wider">{params.record.name}</div>
      </div>
    </div>
  );
};
const CountyRequestAdminColumn = (params: RenderFnParams<RequestAdmin>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <div className="font-semibold tracking-wider">{params.record.name}</div>
      </div>
    </div>
  );
};
const NameRequestAdminColumn = (params: RenderFnParams<RequestAdmin>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <div className="font-semibold tracking-wider">{params.record.name}</div>
      </div>
    </div>
  );
};

const StatusRequestAdminColumn = (params: RenderFnParams<RequestAdmin>) => {
  return (
    <AppBadge colorScheme="primary">
      <div className="font-medium text-sm">{params.record.status}</div>
    </AppBadge>
  );
};

const ActionsColumn = ({
  onEdit,
}: // record,
RenderFnParams<RequestAdmin> & {
  onEdit: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <div className="group relative inline-block text-center">
        <AppButton
          onClick={() => {
            onEdit();
          }}
          title="Edit RequestAdmin"
          size="sm"
          variant="ghost"
        >
          <Icon.Eye size={18} />
        </AppButton>
        <AppTooltip>Edit RequestAdmin</AppTooltip>
      </div>
      <div className="group relative inline-block text-center">
        <AppButton
          onClick={() => {
            onEdit();
          }}
          title="Delete RequestAdmin"
          size="sm"
          variant="ghost"
        >
          <Icon.Trash size={18} />
        </AppButton>
        <AppTooltip>Delete RequestAdmin</AppTooltip>
      </div>
    </div>
  );
};

export const AppRequestAdminsTable = ({
  items = [],
  onEdit,
}: RequestAdminsTableProps) => {
  const columns: AppDataGridColumn<RequestAdmin>[] = [
    {
      key: "RequestAdminNumber",
      dataIndex: "RequestAdminNumber",
      title: "ID Number",
      render: NumberRequestAdminColumn,
    },
    {
      key: "RequestAdminCounty",
      dataIndex: "RequestAdminCounty",
      title: "County",
      render: CountyRequestAdminColumn,
    },
    {
      key: "RequestAdminOfficer",
      dataIndex: "RequestAdminOfficer",
      title: "Officer",
      render: OfficerRequestAdminColumn,
    },
    {
      key: "RequestAdminName",
      dataIndex: "RequestAdminName",
      title: "Name",
      render: NameRequestAdminColumn,
    },
    {
      key: "RequestAdminStatus",
      dataIndex: "RequestAdminStatus",
      title: "Status",
      render: StatusRequestAdminColumn,
    },

    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: "Actions",
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
        }),
    },
  ];
  return (
    <AppDataGrid<RequestAdmin>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
