import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Aseguradora } from "../../domain/entities/Aseguradora";
import { AseguradoraRepository } from "../../domain/repositories/aseguradora-repository";

export const getAseguradoraService: AseguradoraRepository["getAseguradoras"] =
  async () => {
    const response = await api().get("Catalog/Aseguradora", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];
    const aseguradoras = data.map<Aseguradora>((aseguradora) => ({
      idAseguradora: aseguradora.idAseguradora,
      descripcion: aseguradora.descripcion,
    }));
    return aseguradoras;
  };
