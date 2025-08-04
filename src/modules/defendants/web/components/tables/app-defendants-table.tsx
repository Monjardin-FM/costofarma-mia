import * as Icon from "react-feather";
import { Defendant } from "../../../domain/entities/defendant";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAuthorizationGuard } from "../../../../../presentation/Components/AppAuthorizationGuard";
import { TFunction } from "i18next";
export type DefendantsTableProps = {
  loadingDeleteDefendant: boolean;
  items?: Defendant[];
  onEdit: (params: RenderFnParams<Defendant>) => void;
  onDelete: (params: RenderFnParams<Defendant>) => void;
  onAddNote: (params: RenderFnParams<Defendant>) => void;
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

const NamDefendantColumn = (params: RenderFnParams<Defendant>) => {
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
      <div className="flex flex-col items-start justify-center">
        <span className="font-semibold tracking-wider text-primaryColor-700 ">
          {`${params.record.name} ${params.record.lastName}`}
        </span>
        {/* <Chip color="primary" variant="dot" radius="md">
          <span className="text-xs">
            {dayjs(dayjs(params.record.birthDate).toDate()).format(
              "DD-MM-YYYY"
            )}
          </span>
        </Chip> */}
        <Chip color="warning" variant="shadow" radius="md">
          <span className="text-xs">{params.record.userName}</span>
        </Chip>
      </div>
    </div>
  );
};

const EmailDefendantColumn = (params: RenderFnParams<Defendant>) => {
  return (
    <Chip color="primary" variant="shadow">
      <div className="font-medium text-sm">{params.record.eMail}</div>
    </Chip>
  );
};
const SIDDefendantColumn = (params: RenderFnParams<Defendant>) => {
  return (
    <Chip color="danger" variant="dot">
      <div className="font-semibold text-sm text-primary-600 tracking-wider">
        {params.record.sid}
      </div>
    </Chip>
  );
};

const StatusDefendantColumn = ({
  record,
  translation,
}: RenderFnParams<Defendant> & {
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
  onAddNote,
  loadingDeleteDefendant,
  translation,
}: // record,
RenderFnParams<Defendant> & {
  onEdit: () => void;
  onDelete: () => void;
  onAddNote: () => void;
  loadingDeleteDefendant: boolean;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipAddNote")}
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
            onAddNote();
          }}
          title="Add Note"
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
        >
          <Icon.Book size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipEditDefendant")}
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
          title="Edit Defendant"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <AppAuthorizationGuard
        roles={["County Administrator", "OTC Administrator"]}
      >
        <Tooltip
          content={translation("TooltipDeleteDefendant")}
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
            title="Delete Defendant"
            size="sm"
            variant="shadow"
            color="danger"
            isIconOnly
            isDisabled={loadingDeleteDefendant}
          >
            <Icon.Trash size={18} />
          </Button>
        </Tooltip>
      </AppAuthorizationGuard>
    </div>
  );
};

export const AppDefendantsTable = ({
  items = [],
  onEdit,
  onDelete,
  onAddNote,
  loadingDeleteDefendant,
  translation,
}: DefendantsTableProps) => {
  const columns: AppDataGridColumn<Defendant>[] = [
    {
      key: "defendantName",
      dataIndex: "defendantName",
      title: translation("NameDefendantColumn"),
      render: NamDefendantColumn,
    },
    {
      key: "defendantEmail",
      dataIndex: "defendantEmail",
      title: translation("EmailDefendantColumn"),
      render: EmailDefendantColumn,
    },
    {
      key: "defendantSID",
      dataIndex: "defendantSID",
      title: translation("SIDDefendantColumn"),
      render: SIDDefendantColumn,
    },
    // {
    //   key: "defendantCaseNumber",
    //   dataIndex: "defendantCaseNumber",
    //   title: "Case Number",
    //   render: CaseNumberDefendantColumn,
    // },
    {
      key: "defendantStatus",
      dataIndex: "defendantStatus",
      title: translation("StatusDefendantColumn"),
      render: (data) =>
        StatusDefendantColumn({ ...data, translation: translation }),
    },
    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ActionsDefendantColumn"),
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          onAddNote: () => {
            onAddNote(data);
          },
          loadingDeleteDefendant: loadingDeleteDefendant,
          translation: translation,
        }),
    },
  ];
  return (
    <AppDataGrid<Defendant> columns={columns} dataSource={items} itemKey="id" />
  );
};
