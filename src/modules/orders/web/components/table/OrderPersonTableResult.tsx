import { Button, Chip, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { OrderByPerson } from "../../../domain/entities/OrderByPerson";
import * as Icon from "react-feather";
import { AppAuthorizationGuard } from "../../../../../presentation/Components/AppAuthorizationGuard";
import { UserRole } from "../../../../user/domain/entities/user-role";
import AppConfig from "../../../../../settings.json";

export type OrderPersonTableResultProps = {
  items?: OrderByPerson[];
  onView: (params: RenderFnParams<OrderByPerson>) => void;
  onPay: (params: RenderFnParams<OrderByPerson>) => void;
  onDelete: (params: RenderFnParams<OrderByPerson>) => void;
  onGenerateAgain: (params: RenderFnParams<OrderByPerson>) => void;
  onViewTIcket: (params: RenderFnParams<OrderByPerson>) => void;
  loadingDeleteOrder: boolean;
  tour?: React.ReactNode;
};
export const getRandomColorSchema = (params: { length: number }) => {
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
const FolioColumn = (params: RenderFnParams<OrderByPerson>) => {
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
          <Icon.Box size={20} />
        </AppAvatar>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold ">{params.record.nombreCompleto}</span>
        <Chip
          className="font-bold tracking-wider"
          variant="shadow"
          color="primary"
        >
          {params.record.folio}
        </Chip>
      </div>
    </div>
  );
};
const DateColumn = (params: RenderFnParams<OrderByPerson>) => {
  return (
    <Chip color="primary" variant="flat">
      <div className="flex gap-2">
        <Icon.Calendar size={16} className="mr-2" />
        <span>
          {new Date(params.record.fechaCreacion).toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </span>
      </div>
    </Chip>
  );
};
const StatusColumn = (params: RenderFnParams<OrderByPerson>) => {
  const { idStatus, pagado } = params.record;

  let color: "primary" | "success" | "warning" | "default" = "default";
  let label = "";

  if (pagado) {
    color = "success";
    label = "Pagado";
  } else {
    switch (idStatus) {
      case 3:
        color = "primary";
        label = "En revisión";
        break;
      case 6:
        color = "warning";
        label = "Listo para pagar";
        break;
      default:
        color = "default";
        label = "Desconocido";
        break;
    }
  }
  return (
    <div className="flex flex-col items-center jusitfy-center">
      <Chip color={color}>{label}</Chip>
    </div>
  );
};
const ActionsColumn = ({
  // onPay,
  onView,
  // record,
  onDelete,
  onGenerateAgain,
  onViewTIcket,
  loadingDeleteOrder,
  tour,
}: RenderFnParams<OrderByPerson> & {
  onPay: () => void;
  onView: () => void;
  onDelete: () => void;
  onGenerateAgain: () => void;
  onViewTIcket: () => void;
  loadingDeleteOrder: boolean;
  tour?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-end gap-3">
      {tour}
      <Tooltip
        content="Ver detalle del pedido"
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
          onPress={() => {
            onView();
          }}
          size="sm"
          variant="shadow"
          isIconOnly
          color="primary"
        >
          <Icon.Eye size={18} id="DetallePedido" />
        </Button>
      </Tooltip>
      <Tooltip
        content="Descargar ticket"
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
          onPress={() => {
            onViewTIcket();
          }}
          size="sm"
          variant="shadow"
          isIconOnly
          color="success"
        >
          <Icon.Download size={18} id="VerTicket" />
        </Button>
      </Tooltip>
      <AppAuthorizationGuard
        roles={
          AppConfig[
            "masterOrder.managementPage.actionsAuthorization"
          ] as UserRole[]
        }
      >
        {/* {record.idStatus === 6 && !record.pagado && (
          <Tooltip
            content="Pagar"
            color="warning"
            style={{ zIndex: 0 }}
            offset={1}
            showArrow
            closeDelay={10}
            disableAnimation
          >
            <Button
              onPress={() => onPay()}
              size="sm"
              variant="shadow"
              isIconOnly
              color="warning"
            >
              <Icon.CreditCard size={18} id="PagarPedido" />
            </Button>
          </Tooltip>
        )} */}

        <Tooltip
          content="Volver a generar pedido"
          color="secondary"
          style={{
            zIndex: 0,
          }}
          offset={1}
          showArrow
          closeDelay={10}
          disableAnimation
        >
          <Button
            onPress={() => {
              onGenerateAgain();
            }}
            size="sm"
            variant="shadow"
            isIconOnly
            color="secondary"
          >
            <Icon.RefreshCw size={18} id="GenerarOtraVez" />
          </Button>
        </Tooltip>

        <Tooltip
          content="Eliminar pedido"
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
            size="sm"
            variant="shadow"
            isIconOnly
            color="danger"
            isLoading={loadingDeleteOrder}
            isDisabled={loadingDeleteOrder}
          >
            <Icon.Trash size={18} id="EliminarPedido" />
          </Button>
        </Tooltip>
      </AppAuthorizationGuard>
    </div>
  );
};
export const OrderPersonTableResult = ({
  onPay,
  onView,
  onDelete,
  onGenerateAgain,
  onViewTIcket,
  items = [],
  loadingDeleteOrder,
}: OrderPersonTableResultProps) => {
  const columns: AppDataGridColumn<OrderByPerson>[] = [
    {
      key: "Folio",
      dataIndex: "Folio",
      title: "Folio",
      render: FolioColumn,
    },
    {
      key: "DateColumn",
      dataIndex: "DateColumn",
      title: "Fecha de creación",
      render: DateColumn,
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
      align: "right",
      render: (data) =>
        ActionsColumn({
          ...data,
          onView: () => {
            onView(data);
          },
          onPay: () => {
            onPay(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          onGenerateAgain: () => {
            onGenerateAgain(data);
          },
          onViewTIcket: () => {
            onViewTIcket(data);
          },
          loadingDeleteOrder: loadingDeleteOrder,
        }),
    },
  ];
  return (
    <AppDataGrid<OrderByPerson>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
