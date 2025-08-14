import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { OrdenPerson } from "../../../domain/entities/OrdenPerson";
import * as Icon from "react-feather";
export type OrderPersonTableResultProps = {
  items?: OrdenPerson[];
  onView: (params: RenderFnParams<OrdenPerson>) => void;
  onPay: (params: RenderFnParams<OrdenPerson>) => void;
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
const FolioColumn = (params: RenderFnParams<OrdenPerson>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          className={`font-bold tracking-wider text-gray-900 ${getRandomColorSchema(
            {
              length: Number(params.record.folio),
            }
          )}`}
        >
          <Icon.FileText size={20} />
        </AppAvatar>
      </div>
      <div className="flex flex-col">
        <span className="font-bold tracking-wider text-info-900">
          {params.record.folio}
        </span>
      </div>
    </div>
  );
};
const StatusColumn = (params: RenderFnParams<OrdenPerson>) => {
  return <Chip color="success">Disponible</Chip>;
};
const ActionsColumn = ({
  onPay,
  onView,
}: RenderFnParams<OrdenPerson> & {
  onPay: () => void;
  onView: () => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Tooltip
        content="Ver"
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
            onView();
          }}
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Eye size={18} />
        </Button>
      </Tooltip>
      <Tooltip
        content="Pagar"
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
            onPay();
          }}
          size="sm"
          variant="shadow"
          isIconOnly
          color="warning"
        >
          <Icon.CreditCard size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};
export const OrderPersonTableResult = ({
  onPay,
  onView,
  items = [],
}: OrderPersonTableResultProps) => {
  const columns: AppDataGridColumn<OrdenPerson>[] = [
    {
      key: "Folio",
      dataIndex: "Folio",
      title: "Folio",
      render: FolioColumn,
    },
    {
      key: "StatusColumn",
      dataIndex: "StatusColumn",
      title: "Status",
      render: StatusColumn,
    },
    {
      key: "actionsPerson",
      dataIndex: "actionsPerson",
      title: "Acciones",
      render: (data) =>
        ActionsColumn({
          ...data,
          onView: () => {
            onView(data);
          },
          onPay: () => {
            onPay(data);
          },
        }),
    },
  ];
  return (
    <AppDataGrid<OrdenPerson>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
