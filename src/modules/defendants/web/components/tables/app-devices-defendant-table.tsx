import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { DefendantDevice } from "../../../domain/entities/defendant-device";
import * as Icon from "react-feather";
import clsx from "clsx";
import { TFunction } from "i18next";
export type DefendantDevicesTableProps = {
  items?: DefendantDevice[];
  onEdit: (params: RenderFnParams<DefendantDevice>) => void;
  onDelete: (params: RenderFnParams<DefendantDevice>) => void;
  loadingDeleteDefendantDevice: boolean;
  isCreate: boolean;
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

const NamDefendantDeviceColumn = (params: RenderFnParams<DefendantDevice>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.deviceType.length,
          })}
        >
          <Icon.User size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">
          {params.record.deviceType}
        </div>
      </div>
    </div>
  );
};

const StatusDefendantDeviceColumn = ({
  record,
  translation,
}: RenderFnParams<DefendantDevice> & {
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <Tooltip
      content={
        record.idStatus === 1
          ? translation("TooltipStatusDefendantActive")
          : translation("TooltipStatusDefendantInactive")
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
        <Icon.Circle size={10} />
      </Chip>
    </Tooltip>
  );
};

const ActionsColumn = ({
  onEdit,
  isCreate,
  onDelete,
  loadingDeleteDefendantDevice,
  record,
  translation,
}: // record,
RenderFnParams<DefendantDevice> & {
  onEdit: () => void;
  onDelete: () => void;
  loadingDeleteDefendantDevice: boolean;
  isCreate: boolean;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 static">
      {record.idDeviceType === 1 && (
        <Tooltip
          content={translation("TootltipEditDevice")}
          color="primary"
          offset={5}
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
            color="primary"
            isIconOnly
            isDisabled={isCreate}
          >
            <Icon.Edit size={18} />
          </Button>
        </Tooltip>
      )}
      <Tooltip
        content={translation("TooltipDeleteDevice")}
        color="danger"
        offset={5}
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
          isDisabled={loadingDeleteDefendantDevice || isCreate}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppDefendantDevicesTable = ({
  items = [],
  onEdit,
  onDelete,
  loadingDeleteDefendantDevice,
  isCreate,
  translation,
}: DefendantDevicesTableProps) => {
  const columns: AppDataGridColumn<DefendantDevice>[] = [
    {
      key: "DefendantDeviceName",
      dataIndex: "DefendantDeviceName",
      title: translation("DeviceColumn"),
      render: NamDefendantDeviceColumn,
    },

    {
      key: "DefendantDeviceStatus",
      dataIndex: "DefendantDeviceStatus",
      title: translation("StatusDefendantColumn"),
      render: (data) =>
        StatusDefendantDeviceColumn({ ...data, translation: translation }),
    },
    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ActionsDefendantColumn"),
      className: clsx("", {
        hidden: isCreate,
      }),
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          loadingDeleteDefendantDevice: loadingDeleteDefendantDevice,
          isCreate: isCreate,
          translation: translation,
        }),
    },
  ];
  return (
    <AppDataGrid<DefendantDevice>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
