import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { TrackingPlus } from "../../../domain/entities/tracking-plus";
import * as Icon from "react-feather";
export type TrackingPlussTableProps = {
  // onToggleStatus?: (index: Client) => void;
  // onUpdateClient: (data: Client) => void;
  items?: TrackingPlus[];
  onShowAlerts: (params: RenderFnParams<TrackingPlus>) => void;
  loadingShowAlerts: boolean;
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
const NameTrackingPlusColumn = (params: RenderFnParams<TrackingPlus>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.name.length,
          })}
        >
          <Icon.MapPin size={20} />
        </AppAvatar>
      </div>
      <div className="font-semibold text-sm text-primary-700 TrackingPlus-wider">
        {`${params.record.name} ${params.record.lastName}`}
      </div>
    </div>
  );
};

const CardioTrackingPlusColumn = (params: RenderFnParams<TrackingPlus>) => {
  const cardio = params.record.alerts.find(
    (alert) => alert.alarmName === "Bracelet Low Cardio"
  );
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={cardio && cardio.seqMachineState! ? "danger" : "success"}
        variant="shadow"
        radius="md"
      >
        {cardio && cardio.seqMachineState ? (
          <Icon.AlertTriangle size={12} />
        ) : (
          <Icon.Circle size={12} />
        )}
      </Chip>
    </div>
  );
};
const TamperingTrackingPlusColumn = (params: RenderFnParams<TrackingPlus>) => {
  const tampering = params.record.alerts.find(
    (alert) => alert.alarmName === "Bracelet Tampering"
  );
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={tampering && tampering.seqMachineState! ? "danger" : "success"}
        variant="shadow"
        radius="md"
      >
        {tampering && tampering.seqMachineState ? (
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
  loadingShowAlerts,
}: // record,
RenderFnParams<TrackingPlus> & {
  onShowAlerts: () => void;
  loadingShowAlerts: boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <Tooltip
        content={"Show Alert"}
        showArrow
        color="warning"
        disableAnimation
        closeDelay={100}
      >
        <Button
          onClick={() => {
            onShowAlerts();
          }}
          title="'Show Alert'"
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
          isDisabled={loadingShowAlerts}
        >
          <Icon.Radio size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppTrackingPlussTable = ({
  items = [],
  onShowAlerts,
  loadingShowAlerts,
}: TrackingPlussTableProps) => {
  const columns: AppDataGridColumn<TrackingPlus>[] = [
    {
      key: "TrackingPlusName",
      dataIndex: "TrackingPlusName",
      title: "Name",
      render: NameTrackingPlusColumn,
    },
    {
      key: "TrackingPlusCardio",
      dataIndex: "TrackingPlusCardio",
      title: "Cardio",
      render: CardioTrackingPlusColumn,
    },
    {
      key: "TrackingPlusTampering",
      dataIndex: "TrackingPlusTampering",
      title: "Tampering",
      render: TamperingTrackingPlusColumn,
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
          loadingShowAlerts: loadingShowAlerts,
        }),
    },
  ];
  return (
    <AppDataGrid<TrackingPlus>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
