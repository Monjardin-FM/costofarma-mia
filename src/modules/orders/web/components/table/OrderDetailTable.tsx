import { Chip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { OrderDetail } from "../../../domain/entities/OrderDetail";
import { getRandomColorSchema } from "./OrderPersonTableResult";
import * as Icon from "react-feather";

export type OrderDetailTableResultProps = {
  items?: OrderDetail[];
  //   onView: (params: RenderFnParams<OrderDetail>) => void;
  //   onPay: (params: RenderFnParams<OrderDetail>) => void;
  //   onDelete: (params: RenderFnParams<OrderDetail>) => void;
  //   loadingDeleteOrder: boolean;
};
const NameProductColumn = (params: RenderFnParams<OrderDetail>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          className={`font-bold tracking-wider text-gray-900 ${getRandomColorSchema(
            {
              length:
                Number(params.record.ean) * Number(params.record.cantidad),
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
          {`${params.record.cantidad} pzas.`}
        </span>
      </div>
    </div>
  );
};
const PriceColumn = (params: RenderFnParams<OrderDetail>) => {
  return (
    <div className="flex items-center justify-start">
      <Chip variant="shadow" color="warning" className="font-semibold">
        ${params.record.precio.toFixed(2)}
      </Chip>
    </div>
  );
};
const QuantityColumn = (params: RenderFnParams<OrderDetail>) => {
  return (
    <Chip variant="faded" color="primary" className="font-semibold ">
      {params.record.cantidad}
    </Chip>
  );
};

export const OrderDetailTable = ({ items }: OrderDetailTableResultProps) => {
  const columns: AppDataGridColumn<OrderDetail>[] = [
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
    //   {
    //     key: "actions",
    //     title: "Acciones",
    //     render: ({ index, record }) => {
    //       return ActionColumn({ index, record, onAdd });
    //     },
    //   },
  ];
  return (
    <AppDataGrid<OrderDetail>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
