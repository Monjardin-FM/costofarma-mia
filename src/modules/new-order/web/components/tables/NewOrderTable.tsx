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
  onAdd: (params: RenderFnParams<Product>) => void;
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
        <div className="flex gap-2 items-center">
          <span className="font-bold tracking-wider text-info-900">
            {params.record.descripcion}
          </span>
          {params.record.banControlado && (
            <Tooltip
              content="Medicamento controlado"
              disableAnimation
              color="warning"
            >
              <Icon.Shield size={15} color="yellow" />
            </Tooltip>
          )}
          {params.record.banCronico && (
            <Tooltip
              content="Medicamento crónico"
              disableAnimation
              color="danger"
            >
              <Icon.LifeBuoy size={15} color="red" />
            </Tooltip>
          )}
          {params.record.banRefrigerado && (
            <Tooltip
              content="Medicamento refrigerado"
              disableAnimation
              color="primary"
            >
              <Icon.Thermometer size={15} color="blue" />
            </Tooltip>
          )}
          {params.record.requiereReceta && (
            <Tooltip
              content="Este medicamento requiere receta"
              disableAnimation
              color="secondary"
            >
              <Icon.Layout size={15} color="#A020F0" />
            </Tooltip>
          )}
        </div>
        <span className="font-semibold text-gray-600 text-xs">
          {params.record.ean}
        </span>
      </div>
    </div>
  );
};

const PriceColumn = (params: RenderFnParams<Product>) => {
  return (
    <div className="flex items-center justify-start">
      <Chip variant="shadow" color="warning" className="font-semibold ">
        ${params.record.precio.toFixed(2)}
      </Chip>
    </div>
  );
};
const QuantityColumn = (params: RenderFnParams<Product>) => {
  return (
    <Chip variant="shadow" color="primary" className="font-semibold ">
      {params.record.cantidad}
    </Chip>
  );
};
export const ActionColumn = ({
  onAdd,
}: RenderFnParams<Product> & { onAdd: () => void }) => {
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
        disableAnimation
      >
        <Button
          onClick={() => onAdd()}
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
export const NewOrderTable = ({ onAdd, items = [] }: NewOrderTableProps) => {
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
      align: "left",
    },
    {
      key: "quantity",
      title: "Inventario",
      render: QuantityColumn,
    },
    {
      key: "actions",
      title: "Acciones",
      render: (data) => ActionColumn({ ...data, onAdd: () => onAdd(data) }),
    },
  ];
  return (
    <AppDataGrid<Product> columns={columns} dataSource={items} itemKey="id" />
  );
};
