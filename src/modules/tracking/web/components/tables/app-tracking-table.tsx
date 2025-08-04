import * as Icon from "react-feather";
import { Tracking } from "../../../domain/entities/tracking";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { TFunction } from "i18next";

export type TrackingsTableProps = {
  items?: Tracking[];
  onEdit: (params: RenderFnParams<Tracking>) => void;
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
const NameTrackingColumn = (params: RenderFnParams<Tracking>) => {
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
      <div className="font-semibold text-sm text-primary-700 tracking-wider">
        {`${params.record.name} ${params.record.lastName}`}
      </div>
    </div>
  );
};

// const CardioTrackingColumn = (params: RenderFnParams<Tracking>) => {
//   const cardio = params.record.alerts.find(
//     (alert) => alert.alarmName === "Bracelet Low Cardio"
//   );
//   return (
//     <div className="flex items-center space-x-3">
//       <Chip
//         color={cardio && cardio.seqMachineState! ? "danger" : "success"}
//         variant="shadow"
//         radius="md"
//       >
//         {cardio && cardio.seqMachineState ? (
//           <Icon.AlertTriangle size={12} />
//         ) : (
//           <Icon.Circle size={12} />
//         )}
//       </Chip>
//     </div>
//   );
// };
const TamperingTrackingColumn = (params: RenderFnParams<Tracking>) => {
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

const BatteryTrackingColumn = (params: RenderFnParams<Tracking>) => {
  const battery = params.record.alerts.find(
    (alert) => alert.alarmName === "Device Battery Low"
  );
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={battery && battery.seqMachineState! ? "danger" : "success"}
        variant="shadow"
        radius="md"
      >
        {battery && battery.seqMachineState ? (
          <Icon.AlertTriangle size={12} />
        ) : (
          <Icon.Circle size={12} />
        )}
      </Chip>
    </div>
  );
};

const ExclusionTrackingColumn = (params: RenderFnParams<Tracking>) => {
  const exclusion = params.record.alerts.find(
    (alert) => alert.alarmName === "Exclusion Alarm"
  );
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={exclusion && exclusion.seqMachineState! ? "danger" : "success"}
        variant="shadow"
        radius="md"
      >
        {exclusion && exclusion.seqMachineState ? (
          <Icon.AlertTriangle size={12} />
        ) : (
          <Icon.Circle size={12} />
        )}
      </Chip>
    </div>
  );
};
const PerimeterTrackingColumn = (params: RenderFnParams<Tracking>) => {
  const perimeter = params.record.alerts.find(
    (alert) => alert.alarmName === "Perimeter Alarm"
  );
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={perimeter && perimeter.seqMachineState! ? "danger" : "success"}
        variant="shadow"
        radius="md"
      >
        {perimeter && perimeter.seqMachineState ? (
          <Icon.AlertTriangle size={12} />
        ) : (
          <Icon.Circle size={12} />
        )}
      </Chip>
    </div>
  );
};
const PositionTrackingColumn = (params: RenderFnParams<Tracking>) => {
  const positionTimeout = params.record.alerts.find(
    (alert) => alert.alarmName === "Position Timeout"
  );
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={
          positionTimeout && positionTimeout.seqMachineState!
            ? "danger"
            : "success"
        }
        variant="shadow"
        radius="md"
      >
        {positionTimeout && positionTimeout.seqMachineState ? (
          <Icon.AlertTriangle size={12} />
        ) : (
          <Icon.Circle size={12} />
        )}
      </Chip>
    </div>
  );
};
const ProximityTrackingColumn = (params: RenderFnParams<Tracking>) => {
  const proximity = params.record.alerts.find(
    (alert) => alert.alarmName === "Proximity Alert"
  );
  return (
    <div className="flex items-center space-x-3">
      <Chip
        color={proximity && proximity.seqMachineState! ? "danger" : "success"}
        variant="shadow"
        radius="md"
      >
        {proximity && proximity.seqMachineState ? (
          <Icon.AlertTriangle size={12} />
        ) : (
          <Icon.Circle size={12} />
        )}
      </Chip>
    </div>
  );
};

const ActionsColumn = ({
  onEdit,
  translation,
}: // record,
RenderFnParams<Tracking> & {
  onEdit: () => void;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-8">
      <Tooltip
        content={translation("TooltipTracking")}
        showArrow
        color="warning"
        disableAnimation
        closeDelay={100}
      >
        <Button
          onClick={() => {
            onEdit();
          }}
          title="Edit Tracking"
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
        >
          <Icon.Map size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppTrackingsTable = ({
  items = [],
  onEdit,
  translation,
}: TrackingsTableProps) => {
  const columns: AppDataGridColumn<Tracking>[] = [
    {
      key: "TrackingName",
      dataIndex: "TrackingName",
      title: translation("NameTrackingColumn"),
      render: NameTrackingColumn,
    },
    // {
    //   key: "TrackingCardio",
    //   dataIndex: "TrackingCardio",
    //   title: "Cardio",
    //   render: CardioTrackingColumn,
    // },
    {
      key: "TrackingTampering",
      dataIndex: "TrackingTampering",
      title: translation("TamperingTrackingColumn"),
      render: TamperingTrackingColumn,
    },
    {
      key: "TrackingBattery",
      dataIndex: "TrackingBattery",
      title: translation("BatteryTrackingColumn"),
      render: BatteryTrackingColumn,
    },
    {
      key: "TrackingExclusion",
      dataIndex: "TrackingExclusion",
      title: translation("ExclusionTrackingColumn"),
      render: ExclusionTrackingColumn,
    },
    {
      key: "TrackingPerimeter",
      dataIndex: "TrackingPerimeter",
      title: translation("PerimeterTrackingColumn"),
      render: PerimeterTrackingColumn,
    },
    {
      key: "TrackingPosition",
      dataIndex: "TrackingPosition",
      title: translation("PositionTrackingColumn"),
      render: PositionTrackingColumn,
    },
    {
      key: "TrackingProximity",
      dataIndex: "TrackingProximity",
      title: translation("ProximityTrackingColumn"),
      render: ProximityTrackingColumn,
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
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<Tracking> columns={columns} dataSource={items} itemKey="id" />
  );
};
