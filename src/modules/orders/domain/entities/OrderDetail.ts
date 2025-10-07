import { Product } from "../../../new-order/domain/entities/product";
export type Direccion = {
  idDomicilio: number;
  idMunicipio: number;
  idEstado: number;
};
export type OrderDetail = {
  idOrden: number;
  fechaCreacion: string; // ISO date string
  direccion: Direccion;
  productos: Product[];
  persona: {
    idUser: number;
    idPersona: number;
    idPersonaConvenio: number;
    idGenero: number;
    idConvenio: number;
  };
  idStatus: number;
  idStatusAutorizacion: number;
  pagado: boolean;
  idpersona: number;
};
