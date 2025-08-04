import * as Icon from "react-feather";
import { Victim } from "../../domain/entities/victim";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../presentation/types/UIColorScheme";
import { AppAvatar } from "../../../../presentation/Components/AppAvatar";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import { TFunction } from "i18next";

export type VictimsTableProps = {
  items?: Victim[];
  onEdit: (params: RenderFnParams<Victim>) => void;
  onAddAddress: (params: RenderFnParams<Victim>) => void;
  onShowAddress: (params: RenderFnParams<Victim>) => void;
  onDelete: (params: RenderFnParams<Victim>) => void;
  onAddPhone: (params: RenderFnParams<Victim>) => void;
  onAddReferenceContact: (params: RenderFnParams<Victim>) => void;
  onDownloadFile: (params: RenderFnParams<Victim>) => void;
  onUploadFile: (params: RenderFnParams<Victim>) => void;
  loadingDeleteVictim: boolean;
  loadingDownloadFile: boolean;
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

const NameVictimsColumn = (params: RenderFnParams<Victim>) => {
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
      <div className="flex flex-col items-start justify-center gap-1">
        <span className="font-semibold tracking-wider">
          {`${params.record.name} ${params.record.lastName}`}
        </span>
        <Chip color="primary" variant="dot" radius="md">
          <span className="text-xs">
            {dayjs(dayjs(params.record.birthDate).toDate()).format(
              "DD-MM-YYYY"
            )}
          </span>
        </Chip>
        <Chip color="warning" variant="shadow" radius="md">
          <span className="text-xs">{params.record.userName}</span>
        </Chip>
      </div>
    </div>
  );
};

const EmailVictimsColumn = (params: RenderFnParams<Victim>) => {
  return (
    <Chip color="primary" variant="shadow">
      <div className="font-medium text-sm">{params.record.eMail}</div>
    </Chip>
  );
};
const InfoVictimsColumn = (params: RenderFnParams<Victim>) => {
  return (
    <div className="flex flex-col items-start justify-center gap-1">
      <Chip color="success" variant="dot">
        <div className="flex flex-row font-medium text-sm">
          <span>{`sid: ${params.record.sid}`}</span>
        </div>
      </Chip>
      <Chip color="warning" variant="dot">
        <div className="flex flex-row font-medium text-sm">
          <span>{`Case Number: ${params.record.caseNumber}`}</span>
        </div>
      </Chip>
    </div>
  );
};
const StatusVictimsColumn = ({
  record,
  translation,
}: RenderFnParams<Victim> & {
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
  onAddAddress,
  onShowAddress,
  onDelete,
  loadingDeleteVictim,
  onAddPhone,
  onDownloadFile,
  onUploadFile,
  loadingDownloadFile,
  onAddReferenceContact,
  translation,
}: // record,
RenderFnParams<Victim> & {
  onEdit: () => void;
  onAddAddress: () => void;
  onShowAddress: () => void;
  onDelete: () => void;
  loadingDeleteVictim: boolean;
  loadingDownloadFile: boolean;
  onAddPhone: () => void;
  onAddReferenceContact: () => void;
  onDownloadFile: () => void;
  onUploadFile: () => void;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipShowInfoVictim")}
        color="warning"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onShowAddress();
          }}
          title="Show Info"
          size="sm"
          variant="shadow"
          color="warning"
          isIconOnly
        >
          <Icon.Eye size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipEditVictim")}
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
          title="Edit Victim"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipAddAddressVictim")}
        color="success"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onAddAddress();
          }}
          title="Add Address"
          size="sm"
          variant="shadow"
          color="success"
          isIconOnly
        >
          <span className="text-md">+</span>
          <Icon.Map size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipAddPhoneVictim")}
        color="success"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onAddPhone();
          }}
          title="Add Phone"
          size="sm"
          variant="shadow"
          color="success"
          isIconOnly
        >
          <span className="text-md">+</span>
          <Icon.PhoneCall size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipAddReferenceVictim")}
        color="success"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onAddReferenceContact();
          }}
          title="Add Reference Contact"
          size="sm"
          variant="shadow"
          color="success"
          isIconOnly
        >
          <span className="text-md"></span>
          <Icon.UserPlus size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipUploadFileVictim")}
        color="secondary"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onUploadFile();
          }}
          title="Upload File"
          size="sm"
          variant="shadow"
          color="secondary"
          isIconOnly
        >
          <Icon.UploadCloud size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDownloadFileVictim")}
        color="default"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onDownloadFile();
          }}
          title="Download File"
          size="sm"
          variant="shadow"
          color="default"
          isIconOnly
          isDisabled={loadingDownloadFile}
        >
          <Icon.DownloadCloud size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDeleteVictim")}
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
          title="Delete Victim"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDeleteVictim}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppVictimssTable = ({
  items = [],
  onEdit,
  onDelete,
  onAddAddress,
  onShowAddress,
  loadingDeleteVictim,
  onAddPhone,
  onAddReferenceContact,
  onDownloadFile,
  onUploadFile,
  loadingDownloadFile,
  translation,
}: VictimsTableProps) => {
  const columns: AppDataGridColumn<Victim>[] = [
    {
      key: "VictimsName",
      dataIndex: "VictimsName",
      title: translation("NameVictimColumn"),
      render: NameVictimsColumn,
    },
    {
      key: "VictimsEmail",
      dataIndex: "VictimsEmail",
      title: translation("EmailVictimColumn"),
      render: EmailVictimsColumn,
    },
    {
      key: "VictimsInfo",
      dataIndex: "VictimsInfo",
      title: translation("InfoVictimColumn"),
      render: InfoVictimsColumn,
    },
    {
      key: "VictimsStatus",
      dataIndex: "VictimsStatus",
      title: translation("StatusVictimColumn"),
      render: (data) =>
        StatusVictimsColumn({ ...data, translation: translation }),
    },

    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: translation("ActionsVictimColumn"),
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          onAddAddress: () => {
            onAddAddress(data);
          },
          onShowAddress: () => {
            onShowAddress(data);
          },
          onAddPhone: () => {
            onAddPhone(data);
          },
          onAddReferenceContact: () => {
            onAddReferenceContact(data);
          },
          onDownloadFile: () => {
            onDownloadFile(data);
          },
          onUploadFile: () => {
            onUploadFile(data);
          },
          loadingDeleteVictim: loadingDeleteVictim,
          loadingDownloadFile: loadingDownloadFile,
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<Victim> columns={columns} dataSource={items} itemKey="id" />
  );
};
