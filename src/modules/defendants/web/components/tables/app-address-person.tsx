import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { Address } from "../../../domain/entities/address";
import * as Icon from "react-feather";
import clsx from "clsx";
import { TFunction } from "i18next";
export type AddressPersonsTableProps = {
  loadingDeleteAddress: boolean;
  items?: Address[];
  onEdit: (params: RenderFnParams<Address>) => void;
  onDelete: (params: RenderFnParams<Address>) => void;
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

const NameAddressPersonColumn = (params: RenderFnParams<Address>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.streetAvenue.length,
          })}
        >
          <Icon.Map size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">
          {`${params.record.streetAvenue}, ${params.record.city}, ${params.record.zipCode} `}
        </div>
      </div>
    </div>
  );
};

const TypeAddressPersonColumn = (params: RenderFnParams<Address>) => {
  return (
    <Chip
      color={params.record.idAddressType === 1 ? "primary" : "warning"}
      variant="shadow"
    >
      <div className="font-semibold text-xs tracking-wider">
        {params.record.addressType}
      </div>
    </Chip>
  );
};
const StatusAddressPersonColumn = ({
  record,
  translation,
}: RenderFnParams<Address> & {
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
  onDelete,
  loadingDeleteAddress,
  translation,
}: // isCreate,
// record,
RenderFnParams<Address> & {
  onEdit: () => void;
  onDelete: () => void;
  loadingDeleteAddress: boolean;
  isCreate: boolean;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-3 static -z-50">
      <Tooltip
        content={translation("TooltipEditAddress")}
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
          title="Edit Address"
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content={translation("TooltipDeleteAddress")}
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
          title="Delete Address"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDeleteAddress}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppAddressPersonsTable = ({
  items = [],
  onEdit,
  onDelete,
  loadingDeleteAddress,
  isCreate,
  translation,
}: AddressPersonsTableProps) => {
  const columns: AppDataGridColumn<Address>[] = [
    {
      key: "AddressPersonName",
      dataIndex: "AddressPersonName",
      title: translation("AddressColumn"),
      render: NameAddressPersonColumn,
    },
    {
      key: "AddressType",
      dataIndex: "AddressType",
      title: translation("AddressTypeColumn"),
      render: TypeAddressPersonColumn,
    },

    {
      key: "AddressPersonStatus",
      dataIndex: "AddressPersonStatus",
      title: translation("StatusDefendantColumn"),
      render: (data) =>
        StatusAddressPersonColumn({ ...data, translation: translation }),
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
          loadingDeleteAddress: loadingDeleteAddress,
          isCreate: isCreate,
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<Address> columns={columns} dataSource={items} itemKey="id" />
  );
};
