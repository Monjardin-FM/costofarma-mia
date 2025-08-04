import * as Icon from "react-feather";
import { Device } from "../../../domain/entities/device";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { TFunction } from "i18next";
export type DevicessTableProps = {
  items?: Device[];
  onEdit: (params: RenderFnParams<Device>) => void;
  onDelete: (params: RenderFnParams<Device>) => void;
  onTracking: (params: RenderFnParams<Device>) => void;
  loadingDeleteDevice: boolean;
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

const NameDevicesColumn = (params: RenderFnParams<Device>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.description.length,
          })}
        >
          <Icon.Radio size={20} />
        </AppAvatar>
      </div>
      <div className="flex flex-col">
        <span className="font-bold tracking-wider text-gray-900">
          {params.record.description}
        </span>
        <span className="font-semibold text-gray-600 text-xs">
          {params.record.deviceType}
        </span>
      </div>
    </div>
  );
};

const StatusDevicesColumn = ({
  record,
  translation,
}: RenderFnParams<Device> & {
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <Tooltip
      content={
        record.idStatus === 1
          ? translation("TooltipStatusActive")
          : translation("TooltipStatusInactive")
      }
      color="primary"
      offset={15}
      showArrow
      closeDelay={10}
      disableAnimation
    >
      <Chip
        color={record.idStatus === 1 ? "success" : "danger"}
        variant="shadow"
        radius="full"
      >
        {record.idStatus === 1 ? (
          <Icon.Circle size={12} />
        ) : (
          <Icon.AlertTriangle size={12} />
        )}
      </Chip>
    </Tooltip>
  );
};
const NumberDevicesColumn = (params: RenderFnParams<Device>) => {
  return (
    <Chip variant="shadow" color="primary">
      <span className="font-semibold text-sm tracking-wider">
        {params.record.description}
      </span>
    </Chip>
  );
};

const ActionsColumn = ({
  onEdit,
  record,
  onDelete,
  onTracking,
  loadingDeleteDevice,
  translation,
}: RenderFnParams<Device> & {
  onEdit: () => void;
  onDelete: () => void;
  onTracking: () => void;
  loadingDeleteDevice: boolean;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <Tooltip
        content={translation("TooltipEditDevice")}
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
          title="Edit Device"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDeleteDevice")}
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
          title="Delete Device"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDeleteDevice}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
      {/* // 1 IMEI 3 ID */}
      {(record.idDeviceType === 1 || record.idDeviceType === 3) && (
        <Tooltip
          content={translation("TooltipTrackingDevice")}
          color="warning"
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
              onTracking();
            }}
            title="Tracking Device"
            size="sm"
            variant="shadow"
            color="warning"
            isIconOnly
            // isDisabled={loadingDeleteDevice}
          >
            <Icon.MapPin size={18} />
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export const AppDevicessTable = ({
  items = [],
  onEdit,
  onDelete,
  loadingDeleteDevice,
  onTracking,
  translation,
}: DevicessTableProps) => {
  const columns: AppDataGridColumn<Device>[] = [
    {
      key: "DevicesName",
      dataIndex: "DevicesName",
      title: translation("NameDeviceColumn"),
      render: NameDevicesColumn,
    },
    {
      key: "DevicesStatus",
      dataIndex: "DevicesStatus",
      title: translation("StatusDevicesColumn"),
      render: (data) =>
        StatusDevicesColumn({ ...data, translation: translation }),
    },
    {
      key: "DevicesNumber",
      dataIndex: "DevicesNumber",
      title: translation("NumberDevicesColumn"),
      render: NumberDevicesColumn,
    },

    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ActionsColumn"),
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          onTracking: () => {
            onTracking(data);
          },
          loadingDeleteDevice: loadingDeleteDevice,
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<Device> columns={columns} dataSource={items} itemKey="id" />
  );
};
