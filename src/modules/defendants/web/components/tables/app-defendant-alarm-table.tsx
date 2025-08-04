import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AlarmDefendant } from "../../../domain/entities/alarm-defendant";
import * as Icon from "react-feather";
import { TFunction } from "i18next";
export type AlarmDefendantsTableProps = {
  loadingDelete: boolean;
  items?: AlarmDefendant[];
  onView: (params: RenderFnParams<AlarmDefendant>) => void;
  onDelete: (params: RenderFnParams<AlarmDefendant>) => void;
  onEdit: (params: RenderFnParams<AlarmDefendant>) => void;
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

const NameAlarmDefendantColumn = (params: RenderFnParams<AlarmDefendant>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.specificAlarmType.length,
          })}
        >
          <Icon.Bell size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">
          {params.record.specificAlarmType}
        </div>
      </div>
    </div>
  );
};

const StatusAlarmDefendantColumn = ({
  record,
  translation,
}: RenderFnParams<AlarmDefendant> & {
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
  onView,
  onDelete,
  loadingDelete,
  onEdit,
  translation,
}: // record,
RenderFnParams<AlarmDefendant> & {
  onView: () => void;
  onDelete: () => void;
  onEdit: () => void;
  translation: TFunction<[string], undefined>;
  loadingDelete: boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipEditGeofence")}
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
          title="Edit Geofence"
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipViewGeofence")}
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
          title="View Geofence"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Eye size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDeleteGeofence")}
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
          title="Delete Geofence"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDelete}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppAlarmDefendantsTable = ({
  items = [],
  onView,
  onDelete,
  onEdit,
  loadingDelete,
  translation,
}: AlarmDefendantsTableProps) => {
  const columns: AppDataGridColumn<AlarmDefendant>[] = [
    {
      key: "AlarmDefendantName",
      dataIndex: "AlarmDefendantName",
      title: translation("AlarmDefendantColumn"),
      render: NameAlarmDefendantColumn,
    },
    // {
    //   key: "AlarmDefendantType",
    //   dataIndex: "AlarmDefendantType",
    //   title: "AlarmDefendant Type",
    //   render: TypeAlarmDefendantColumn,
    // },

    {
      key: "AlarmDefendantStatus",
      dataIndex: "AlarmDefendantStatus",
      title: translation("StatusDefendantColumn"),
      render: (data) =>
        StatusAlarmDefendantColumn({ ...data, translation: translation }),
    },
    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ActionsDefendantColumn"),
      render: (data) =>
        ActionsColumn({
          ...data,
          onDelete: () => {
            onDelete(data);
          },
          onView: () => {
            onView(data);
          },
          onEdit: () => {
            onEdit(data);
          },
          loadingDelete: loadingDelete,
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<AlarmDefendant>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
