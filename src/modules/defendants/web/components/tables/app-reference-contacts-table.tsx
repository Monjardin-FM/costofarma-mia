import * as Icon from "react-feather";
import { ReferenceContact } from "../../../domain/entities/reference-contact";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import { TFunction } from "i18next";

export type ReferenceContactsTableProps = {
  items?: ReferenceContact[];
  onEdit: (params: RenderFnParams<ReferenceContact>) => void;
  onDelete: (params: RenderFnParams<ReferenceContact>) => void;
  loadingDeleteReference: boolean;
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

const NamReferenceContactColumn = (
  params: RenderFnParams<ReferenceContact>
) => {
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
      <div>
        <div className="font-semibold tracking-wider">{params.record.name}</div>
      </div>
    </div>
  );
};

const EmailReferenceContactColumn = (
  params: RenderFnParams<ReferenceContact>
) => {
  return (
    <Chip color={"warning"} variant="shadow" radius="full">
      <span>{params.record.relationship}</span>
    </Chip>
  );
};
const SIDReferenceContactColumn = (
  params: RenderFnParams<ReferenceContact>
) => {
  return (
    <Chip color={"success"} variant="shadow" radius="full">
      <span>{params.record.address}</span>
    </Chip>
  );
};

const CaseNumberReferenceContactColumn = (
  params: RenderFnParams<ReferenceContact>
) => {
  return (
    <Chip color={"primary"} variant="shadow" radius="full">
      <span>{params.record.phoneNumber}</span>
    </Chip>
  );
};

const ActionsColumn = ({
  onEdit,
  onDelete,
  loadingDeleteReference,
  translation,
}: // record,
RenderFnParams<ReferenceContact> & {
  onEdit: () => void;
  onDelete: () => void;
  isCreate: boolean;
  translation: TFunction<[string], undefined>;
  loadingDeleteReference: boolean;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipEditReferenceContact")}
        color="primary"
        // style={{
        //   zIndex: 0,
        // }}
        offset={1}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onEdit();
          }}
          title="Edit Reference Contact"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDeleteReferenceContact")}
        color="danger"
        // style={{
        //   zIndex: 0,
        // }}
        offset={1}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onDelete();
          }}
          title="Delete Reference Contact"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDeleteReference}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppReferenceContactsTable = ({
  items = [],
  onEdit,
  onDelete,
  isCreate,
  loadingDeleteReference,
  translation,
}: ReferenceContactsTableProps) => {
  const columns: AppDataGridColumn<ReferenceContact>[] = [
    {
      key: "ReferenceContactName",
      dataIndex: "ReferenceContactName",
      title: translation("ReferenceContactColumn"),
      render: NamReferenceContactColumn,
    },
    {
      key: "ReferenceContactEmail",
      dataIndex: "ReferenceContactEmail",
      title: translation("ReferenceContactRelationshipColumn"),
      render: EmailReferenceContactColumn,
    },
    {
      key: "ReferenceContactSID",
      dataIndex: "ReferenceContactSID",
      title: translation("ReferenceContactAddressColumn"),
      render: SIDReferenceContactColumn,
    },
    {
      key: "ReferenceContactCaseNumber",
      dataIndex: "ReferenceContactCaseNumber",
      title: translation("ReferenceContactPhoneColumn"),
      render: CaseNumberReferenceContactColumn,
    },

    {
      key: "actionsClient",
      dataIndex: "actionsClient",
      title: "Actions",
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
          isCreate: isCreate,
          loadingDeleteReference: loadingDeleteReference,
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<ReferenceContact>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
