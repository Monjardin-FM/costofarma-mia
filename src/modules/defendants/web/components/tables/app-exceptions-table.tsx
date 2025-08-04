import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import {
  AlarmException,
  DateAlarmException,
  DayBasedAlarmException,
} from "../../../domain/entities/alarm-defendant-params";
import * as Icon from "react-feather";
import { TFunction } from "i18next";
export type AlarmExceptionTableProps = {
  items?: AlarmException[];
  onDelete: (params: RenderFnParams<AlarmException>) => void;
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

const NameAlarmExceptionPersonColumn = (
  params: RenderFnParams<AlarmException>
) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.description.length,
          })}
        >
          <Icon.Map size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">
          {`${params.record.description}`}
        </div>
      </div>
    </div>
  );
};

const TypeAlarmExceptionPersonColumn = ({
  record,
  translation,
}: RenderFnParams<AlarmException> & {
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <Chip
      color={record.alarmExceptionType === 1 ? "primary" : "warning"}
      variant="shadow"
    >
      <div className="font-semibold text-xs tracking-wider">
        {record.alarmExceptionType === 1
          ? translation("SpanDateRange")
          : translation("SpanDays")}
      </div>
    </Chip>
  );
};

const ActionsColumn = ({
  onDelete,
  translation,
}: // record,
RenderFnParams<AlarmException> & {
  // onEdit: () => void;
  translation: TFunction<[string], undefined>;
  onDelete: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipDeleteAlarmException")}
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
          title="Delete Alarm Exception"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppAlarmExceptionTable = ({
  items = [],
  // onEdit,
  onDelete,
  translation,
}: AlarmExceptionTableProps) => {
  const columns: AppDataGridColumn<
    DateAlarmException | DayBasedAlarmException
  >[] = [
    {
      key: "AlarmExceptionPersonName",
      dataIndex: "AlarmExceptionPersonName",
      title: translation("ScheduleNameColumn"),
      render: NameAlarmExceptionPersonColumn,
    },
    {
      key: "AlarmExceptionType",
      dataIndex: "AlarmExceptionType",
      title: translation("ScheduleTypeColumn"),
      render: (data) =>
        TypeAlarmExceptionPersonColumn({ ...data, translation: translation }),
    },

    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ScheduleActionsColumn"),
      render: (data) =>
        ActionsColumn({
          ...data,
          // onEdit: () => {
          //   onEdit(data);
          // },
          onDelete: () => {
            onDelete(data);
          },
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<DateAlarmException | DayBasedAlarmException>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
