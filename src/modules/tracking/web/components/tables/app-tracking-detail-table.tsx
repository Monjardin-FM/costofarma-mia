import * as Icon from "react-feather";
import { PersonAlert } from "../../../domain/entities/tracking-detail";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { AppBadge } from "../../../../../presentation/Components/AppBadge";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js

dayjs.extend(utc);
dayjs.extend(timezone);

export type TrackingDetailsTableProps = {
  // onToggleStatus?: (index: Client) => void;
  // onUpdateClient: (data: Client) => void;
  items?: PersonAlert[] | null;
  onShowAlerts: (params: RenderFnParams<PersonAlert>) => void;
  onMapShow: (params: RenderFnParams<PersonAlert>) => void;
  loadingShowAlerts: boolean;
  // onNotification: (params: RenderFnParams<UserManage>) => void;
  // onUpdateAlmacen: (params: RenderFnParams<UserManage>) => void;
};

const NameTrackingDetailColumn = (params: RenderFnParams<PersonAlert>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar colorSchema={"warn"}>
          <Icon.AlertCircle size={20} />
        </AppAvatar>
      </div>
      <div className="font-semibold text-sm text-primary-700 TrackingDetail-wider">
        {params.record.alarmName}
      </div>
    </div>
  );
};
const DateTrackingDetailColumn = (params: RenderFnParams<PersonAlert>) => {
  return (
    <div className="flex items-center space-x-3">
      <AppBadge colorScheme="info">
        <div className="font-semibold text-sm text-primary-600 TrackingDetail-wider">
          {dayjs
            .utc(params.record.timestamp)
            .local()
            .format("MM/DD/YYYY HH:mm:ss A")}
        </div>
      </AppBadge>
    </div>
  );
};
const StatusTrackingDetailColumn = (params: RenderFnParams<PersonAlert>) => {
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={params.record.seqMachineState! ? "danger" : "success"}
        variant="shadow"
        radius="md"
      >
        {params.record.seqMachineState ? (
          <Icon.AlertTriangle size={12} />
        ) : (
          <Icon.Circle size={12} />
        )}
      </Chip>
    </div>
  );
};

const ActionsColumn = ({
  onShowAlerts,
  onMapShow,
  loadingShowAlerts,
  record,
}: // record,
RenderFnParams<PersonAlert> & {
  onShowAlerts: () => void;
  onMapShow: () => void;
  loadingShowAlerts: boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <Tooltip
        content={"Show alarm on map"}
        showArrow
        color="warning"
        disableAnimation
        closeDelay={100}
      >
        <Button
          onClick={() => {
            onMapShow();
          }}
          title="Show alarm on map"
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
          isDisabled={loadingShowAlerts}
          isLoading={loadingShowAlerts}
        >
          <Icon.Crosshair size={18} />
        </Button>
      </Tooltip>
      {record.alarmName.includes("Bracelet Tampering") &&
      record.seqMachineState ? (
        <Tooltip
          content={"Cancel Alarm"}
          showArrow
          color="danger"
          disableAnimation
          closeDelay={100}
        >
          <Button
            onClick={() => {
              onShowAlerts();
            }}
            title="Cancel Alarm"
            size="sm"
            variant="shadow"
            isIconOnly
            color="danger"
            isDisabled={loadingShowAlerts}
            isLoading={loadingShowAlerts}
          >
            <Icon.XOctagon size={18} />
          </Button>
        </Tooltip>
      ) : (
        ""
      )}
    </div>
  );
};

export const AppTrackingDetailsTable = ({
  items = [],
  onShowAlerts,
  loadingShowAlerts,
  onMapShow,
}: TrackingDetailsTableProps) => {
  const columns: AppDataGridColumn<PersonAlert>[] = [
    {
      key: "TrackingDetailName",
      dataIndex: "TrackingDetailName",
      title: "Type Alarm",
      render: NameTrackingDetailColumn,
    },
    {
      key: "TrackingDetailDate",
      dataIndex: "TrackingDetailDate",
      title: "Date",
      render: DateTrackingDetailColumn,
    },
    {
      key: "TrackingDetailStatus",
      dataIndex: "TrackingDetailStatus",
      title: "Status",
      render: StatusTrackingDetailColumn,
    },

    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: "Actions",
      render: (data) =>
        ActionsColumn({
          ...data,
          onShowAlerts: () => {
            onShowAlerts(data);
          },
          onMapShow: () => {
            onMapShow(data);
          },
          loadingShowAlerts: loadingShowAlerts,
        }),
    },
  ];
  return (
    <AppDataGrid<PersonAlert>
      columns={columns}
      dataSource={items ? items : []}
      itemKey="id"
    />
  );
};
