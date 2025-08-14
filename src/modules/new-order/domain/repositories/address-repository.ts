import { Colonia } from "../entities/Colonia";
import { Estado } from "../entities/Estado";
import { Municipio } from "../entities/Municipio";

export type AddressRepository = {
  getEstados(): Promise<Estado[]>;
  getMunicipios(params: { idEstado: number }): Promise<Municipio[]>;
  getColonias(params: {
    idMunicipio: number;
    codigoPostal: string;
  }): Promise<Colonia[]>;
};
