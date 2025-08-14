import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Person } from "../../domain/entities/Person";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const getPersonService: OrderRepository["getPerson"] = async (
  params
) => {
  const response = await api().get("Order/Person", {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const persons: Person = {
    idUser: data,
    idPersona: data.idPersona,
    idPersonaConvenio: data.idPersonaConvenio,
    idGenero: data.idGenero,
    idConvenio: data.idConvenio,
    nombre: data.nombre,
    paterno: data.paterno,
    materno: data.materno,
  };
  return persons;
};
