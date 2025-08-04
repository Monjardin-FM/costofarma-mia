import { Button, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AutomaticAlarmsDefendant } from "../../../domain/entities/automatic-alarm-defendant";
import * as Icon from "react-feather";
import { TFunction } from "i18next";
export type AutomaticAlarmsDefendantTableProps = {
  items?: AutomaticAlarmsDefendant[];
  onEdit: (params: RenderFnParams<AutomaticAlarmsDefendant>) => void;
  onView: (params: RenderFnParams<AutomaticAlarmsDefendant>) => void;
  onEditAlarm: (params: RenderFnParams<AutomaticAlarmsDefendant>) => void;
  onViewAlarm: (params: RenderFnParams<AutomaticAlarmsDefendant>) => void;
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

const NameAutomaticAlarmsDefendantPersonColumn = (
  params: RenderFnParams<AutomaticAlarmsDefendant>
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
          {params.record.description}
        </div>
      </div>
    </div>
  );
};

const ActionsColumn = ({
  onEdit,
  onView,
  translation,
}: RenderFnParams<AutomaticAlarmsDefendant> & {
  onEdit: () => void;
  onView: () => void;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipAddSchedule")}
        color="warning"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onEdit();
          }}
          title="Add Shedule"
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
        >
          <Icon.Clock size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipViewSchedule")}
        color="primary"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onView();
          }}
          title="View Shedules"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Eye size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

const AlarmActionsColumn = ({
  onEditAlarm,
  onViewAlarm,
  translation,
}: RenderFnParams<AutomaticAlarmsDefendant> & {
  onEditAlarm: () => void;
  translation: TFunction<[string], undefined>;
  onViewAlarm: () => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipViewAlarm")}
        color="primary"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onViewAlarm();
          }}
          title="View"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Eye size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipEditAlarm")}
        color="warning"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onEditAlarm();
          }}
          title="Edit"
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppAutomaticAlarmsDefendantTable = ({
  items = [],
  onEdit,
  onView,
  onEditAlarm,
  onViewAlarm,
  translation,
}: AutomaticAlarmsDefendantTableProps) => {
  const columns: AppDataGridColumn<AutomaticAlarmsDefendant>[] = [
    {
      key: "AutomaticAlarmsDefendantPersonName",
      dataIndex: "AutomaticAlarmsDefendantPersonName",
      title: translation("NameAlarmColumn"),
      render: NameAutomaticAlarmsDefendantPersonColumn,
    },
    {
      key: "actionsScheduleAlarmDefendant",
      dataIndex: "actionsScheduleAlarmDefendant",
      title: translation("ScheduleActionsColumn"),

      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onView: () => {
            onView(data);
          },
          translation,
        }),
    },
    {
      key: "actionsAlarmDefendant",
      dataIndex: "actionsAlarmDefendant",
      title: translation("AlarmActionsColumn"),

      render: (data) =>
        AlarmActionsColumn({
          ...data,
          onEditAlarm: () => {
            onEditAlarm(data);
          },
          onViewAlarm: () => {
            onViewAlarm(data);
          },
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<AutomaticAlarmsDefendant>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
