import { Product } from "../entities/product";
export type createOrderParams = {
  persona: {
    rfc: string;
    nombre: string;
    paterno: string;
    materno: string;
    telefono: string;
    mailafectado: string;
    afectado?: string;
    parentesco?: string;
  };
  direccion: {
    Calle: string;
    Colonia: string;
    Municipio: string;
    Estado: string;
    CP: string;
    Referencia1: string;
    Referencia2: string;
    Telefono: string;
    Mail: string;
  };
  aseguradora: {
    idAseguradora: number;
    idBroker: number;
    poliza: string;
  };
  productos: {
    idProducto: string;
    cantidad: string;
    ean: string;
    recurrencia:
      | "semanal"
      | "quincenal"
      | "mensual"
      | "bimestral"
      | "trimestral"
      | "semestral"
      | ""
      | string;
  }[];
  documentos: {
    receta: string;
    informeMedico: string;
    recetaExt: string;
    informeMedicoExt: string;
  };
};
export type NewOrderRepository = {
  getProduct(params: { description: string }): Promise<Product[]>;
  createOrder(params: createOrderParams): Promise<void>;
};
