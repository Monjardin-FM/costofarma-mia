import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { PersonById } from "../../domain/entities/PersonById";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const getPersonByIdService: OrderRepository["getPersonById"] = async (
  params
) => {
  const response = await api().get("Order/PersonById", {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;
  const personById: PersonById = {
    idUser: data.idUser,
    idPersona: data.idPersona,
    idPersonaConvenio: data.idPersonaConvenio,
    idGenero: data.idGenero,
    idConvenio: data.idConvenio,
    rfc: data.rfc,
    nombre: data.nombre,
    paterno: data.paterno,
    materno: data.materno,
    direccion: data.direccion,
  };
  return personById;
};
