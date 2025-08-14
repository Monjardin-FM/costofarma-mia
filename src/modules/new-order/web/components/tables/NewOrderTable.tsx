import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { Product } from "../../../domain/entities/product";
import * as Icon from "react-feather";

export type NewOrderTableProps = {
  items?: Product[];
  onAdd: (index: number) => void;
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
const NameProductColumn = (params: RenderFnParams<Product>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          className={`font-bold tracking-wider text-gray-900 ${getRandomColorSchema(
            {
              length: params.record.descripcion.length,
            }
          )}`}
        >
          <Icon.Box size={20} />
        </AppAvatar>
      </div>
      <div className="flex flex-col">
        <span className="font-bold tracking-wider text-info-900">
          {params.record.descripcion}
        </span>
        <span className="font-semibold text-gray-600 text-xs">
          {params.record.ean}
        </span>
      </div>
    </div>
  );
};

const PriceColumn = (params: RenderFnParams<Product>) => {
  return (
    <Chip variant="faded" color="warning" className="font-semibold ">
      ${params.record.precio.toFixed(2)}
    </Chip>
  );
};
const QuantityColumn = (params: RenderFnParams<Product>) => {
  return (
    <Chip variant="faded" color="primary" className="font-semibold ">
      {params.record.cantidad}
    </Chip>
  );
};
export const ActionColumn = ({
  onAdd,
  index,
}: NewOrderTableProps & RenderFnParams<Product>) => {
  return (
    <div className="flex items-center justify-start gpa-5">
      <Tooltip
        content="Agregar a pedido"
        color="success"
        style={{
          zIndex: 0,
        }}
        offset={1}
        showArrow
        closeDelay={10}
        // disableAnimation
      >
        <Button
          onClick={() => onAdd(index)}
          size="sm"
          variant="shadow"
          color="success"
          isIconOnly
        >
          <Icon.PlusCircle size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};
export const NewOrderTable = ({ onAdd, items }: NewOrderTableProps) => {
  const columns: AppDataGridColumn<Product>[] = [
    {
      key: "name",
      title: "Nombre",
      render: NameProductColumn,
    },

    {
      key: "price",
      title: "Precio",
      render: PriceColumn,
    },
    {
      key: "quantity",
      title: "Cantidad",
      render: QuantityColumn,
    },
    {
      key: "actions",
      title: "Acciones",
      render: ({ index, record }) => {
        return ActionColumn({ index, record, onAdd });
      },
    },
  ];
  return (
    <AppDataGrid<Product> columns={columns} dataSource={items} itemKey="id" />
  );
};
