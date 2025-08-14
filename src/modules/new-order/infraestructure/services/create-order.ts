import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { NewOrderRepository } from "../../domain/repositories/new-order-repository";

export const createOrderService: NewOrderRepository["createOrder"] = async (
  params
) => {
  const response = await api().post("Order/OrderNewPerson", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
