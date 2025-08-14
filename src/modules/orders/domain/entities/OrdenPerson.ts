import { Product } from "../../../new-order/domain/entities/product";

export type OrdenPerson = {
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
};
