import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
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
  const rawOrders = body as any[];

  const orders = rawOrders.map((rawOrder) => ({
    id: rawOrder.id,
    invoiceNumber: rawOrder.invoiceNumber,
    idTipoCobro: rawOrder.idTipoCobro,
    created: rawOrder.created,
    patient: {
      id: rawOrder.patient.id,
      paternalName: rawOrder.patient.paternalName,
      maternalname: rawOrder.patient.maternalname,
      name: rawOrder.patient.name,
    },
    banContrapropuesta: rawOrder.banContrapropuesta,
    diasReceta: rawOrder.diasReceta,
    banContrapropuestFile: rawOrder.banContrapropuestFile,
    banVigenciaFile: rawOrder.banVigenciaFile,
    idEstado: rawOrder.idEstado,
    inventario: rawOrder.inventario,
  }));
  return orders;
};
