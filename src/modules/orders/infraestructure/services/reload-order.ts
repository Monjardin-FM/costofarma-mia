import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const reloadOrderService: OrderRepository["reloadOrder"] = async (
  params,
  idPerson
) => {
  const response = await api().post("Order/OrderPerson", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
    searchParams: { idPersona: idPerson },
  });
  await verifyResponse({ response });
};
