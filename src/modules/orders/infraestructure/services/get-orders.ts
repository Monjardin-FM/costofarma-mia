import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Order } from "../../domain/entities/Order";
import {
  FindManyOrdersParams,
  OrderRepository,
} from "../../domain/repositories/order-repository";

export const findManyOrdersService: OrderRepository["getManyOrders"] = async (
  params: FindManyOrdersParams
) => {
  const response = await api().get("Order/orders", {
    searchParams: {
      email: params.query.email ?? "",
      offset: params.pagination.offset?.toString() ?? "0",
      size: params.pagination.size?.toString() ?? "10",
    },
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  const { body } = await verifyResponse({ response });
  const rawOrders = body.data as any[];

  const orders = rawOrders.map<Order>((rawOrder) => ({
    id: rawOrder.id,
    invoiceNumber: rawOrder.invoice_number,
    idTipoCobro: rawOrder.idTipoCobro,
    created: rawOrder.created,
    patient: {
      id: rawOrder.patient.id,
      paternalName: rawOrder.patient.paternal_name,
      maternalname: rawOrder.patient.maternal_name,
      name: rawOrder.patient.name,
    },
    banContrapropuesta: rawOrder.banContrapropuesta,
    diasReceta: rawOrder.diasReceta,
    banContrapropuestFile: rawOrder.banContrapropuestFile,
    banVigenciaFile: rawOrder.banVigenciaFile,
    idEstado: rawOrder.idEstado,
    inventario: rawOrder.inventario,
  }));
  console.table(orders);
  return orders;
};
