import * as Icon from "react-feather";
import { Alarm } from "../../../domain/entities/alarms";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { TFunction } from "i18next";
export type AlarmsTableProps = {
  items?: Alarm[];
  onEdit: (params: RenderFnParams<Alarm>) => void;
  onDelete: (params: RenderFnParams<Alarm>) => void;
  loadingDeleteAlarm: boolean;
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

const NameAlarmsColumn = (params: RenderFnParams<Alarm>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.description.length,
          })}
        >
          <Icon.Clock size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">
          {params.record.description}
        </div>
      </div>
    </div>
  );
};

const StatusAlarmsColumn = ({
  translation,
  record,
}: // record,
RenderFnParams<Alarm> & {
  onEdit: () => void;
  onDelete: () => void;
  loadingDeleteAlarm: boolean;
  translation: TFunction<[string], undefined>;
  record: Alarm;
}) => {
  return (
    <Tooltip
      content={
        record.idStatus === 1
          ? translation("TooltipActiveAlarm")
          : translation("TooltipInactiveAlarm")
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

const ActionsColumn = ({
  onEdit,
  onDelete,
  loadingDeleteAlarm,
  translation,
}: // record,
RenderFnParams<Alarm> & {
  onEdit: () => void;
  onDelete: () => void;
  loadingDeleteAlarm: boolean;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <Tooltip
        content={translation("TooltipEditAlarm")}
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
          title="Edit Alarm"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDeleteAlarm")}
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
          title="Delete Alarm"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDeleteAlarm}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppAlarmssTable = ({
  items = [],
  onEdit,
  onDelete,
  loadingDeleteAlarm,
  translation,
}: AlarmsTableProps) => {
  const columns: AppDataGridColumn<Alarm>[] = [
    {
      key: "AlarmsName",
      dataIndex: "AlarmsName",
      title: translation("ColumnAlarmName"),
      render: NameAlarmsColumn,
    },
    {
      key: "AlarmsStatus",
      dataIndex: "AlarmsStatus",
      title: translation("ColumnAlarmStatus"),
      render: (data) =>
        StatusAlarmsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          translation: translation,
          loadingDeleteAlarm: loadingDeleteAlarm,
        }),
    },

    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ColumnAlarmActions"),
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          loadingDeleteAlarm: loadingDeleteAlarm,
          translation: translation,
        }),
    },
  ];
  return (
    <AppDataGrid<Alarm> columns={columns} dataSource={items} itemKey="id" />
  );
};
