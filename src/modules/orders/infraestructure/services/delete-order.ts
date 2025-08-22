import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const deleteOrderService: OrderRepository["deleteOrder"] = async (
  params
) => {
  const response = await api().delete(`Order`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: { idOrder: params.idOrden.toString() },
  });
  const { body } = await verifyResponse({ response });
  return body.data.result;
};
