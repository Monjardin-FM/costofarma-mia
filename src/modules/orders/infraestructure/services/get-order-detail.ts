import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { OrderDetail } from "../../domain/entities/OrderDetail";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const getOrderDetailService: OrderRepository["getOrderDetail"] = async (
  params
) => {
  const response = await api().get("Order/OrderDetail", {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: params.idOrden.toString(),
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const ordenDetail = data.map<OrderDetail>((orderDetail) => ({
    idProducto: orderDetail.idProducto,
    ean: orderDetail.ean,
    descripcion: orderDetail.descripcion,
    cantidad: orderDetail.cantidad,
    precio: orderDetail.precio,
    requiereReceta: orderDetail.requiereReceta,
    idOrdenDetalle: orderDetail.idOrdenDetalle,
    activo: orderDetail.activo,
  }));
  return ordenDetail;
};
