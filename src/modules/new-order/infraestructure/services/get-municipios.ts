import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Municipio } from "../../domain/entities/Municipio";
import { AddressRepository } from "../../domain/repositories/address-repository";

export const getMunicipiosService: AddressRepository["getMunicipios"] = async (
  params
) => {
  const response = await api().get("Catalog/Municipio", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    searchParams: { idEstado: params.idEstado },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data.municipio as any[];
  const municipios = data.map<Municipio>((municipio) => ({
    idMunicipio: municipio.idEstado,
    descripcion: municipio.descripcion,
  }));
  return municipios;
};
