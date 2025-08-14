import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Colonia } from "../../domain/entities/Colonia";
import { AddressRepository } from "../../domain/repositories/address-repository";

export const getColoniasService: AddressRepository["getColonias"] = async (
  params
) => {
  const response = await api().get("Catalog/Colonia", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    searchParams: {
      idMunicipio: params.idMunicipio,
      codigoPostal: params.codigoPostal,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data.colonia as any[];
  const colonias = data.map<Colonia>((colonia) => ({
    idColonia: colonia.idColonia,
    descripcion: colonia.descripcion,
  }));
  return colonias;
};
