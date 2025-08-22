import { Product } from "../../../new-order/domain/entities/product";

export type OrderByPerson = {
  folio: string;
  idOrden: number;
  fechaCreacion: string;
  direccion: {
    idDomicilio: number;
  };
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
  idpersona: number;
  nombreCompleto: string;
  rfc: string;
  pagado: boolean;
};
