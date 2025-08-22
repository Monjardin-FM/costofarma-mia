import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { OrderByPerson } from "../../domain/entities/OrderByPerson";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const getOrderByPersonService: OrderRepository["getOrdenByPerson"] =
  async () => {
    const response = await api().get("Order", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];
    const ordersByPerson = data.map<OrderByPerson>((order) => ({
      folio: order.folio,
      idOrden: order.idOrden,
      fechaCreacion: order.fechaCreacion,
      direccion: {
        idDomicilio: order.direccion.idDomicilio,
      },
      productos: order.productos,
      persona: {
        idUser: order.persona.idUser,
        idPersona: order.persona.idPersona,
        idPersonaConvenio: order.persona.idPersonaConvenio,
        idGenero: order.persona.idGenero,
        idConvenio: order.persona.idConvenio,
      },
      idStatus: order.idStatus,
      idStatusAutorizacion: order.idStatusAutorizacion,
      nombreCompleto: order.nombreCompleto,
      rfc: order.rfc,
      pagado: order.pagado,
      idpersona: order.idpersona,
    }));
    return ordersByPerson;
  };
