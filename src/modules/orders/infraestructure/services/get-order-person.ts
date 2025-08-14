import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { OrdenPerson } from "../../domain/entities/OrdenPerson";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const getOrderPersonService: OrderRepository["getOrderPerson"] = async (
  params
) => {
  const response = await api().get("Order/OrderPerson", {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: { idPerson: params.idPerson.toString() },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const ordenPersons = data.map<OrdenPerson>((person) => ({
    folio: person.folio,
    idOrden: person.idOrden,
    fechaCreacion: person.fechaCreacion,
    direccion: person.dirección,
    productos: person.productos,
    persona: person.persona,
  }));
  return ordenPersons;
};
