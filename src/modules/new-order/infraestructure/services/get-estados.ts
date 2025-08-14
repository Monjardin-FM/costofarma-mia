import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Estado } from "../../domain/entities/Estado";
import { AddressRepository } from "../../domain/repositories/address-repository";

export const getEstadosService: AddressRepository["getEstados"] = async () => {
  const response = await api().get("Catalog/Estado", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data.estado as any[];
  const estados = data.map<Estado>((estado) => ({
    idEstado: estado.idEstado,
    descripcion: estado.descripcion,
  }));
  return estados;
};
