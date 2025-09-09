import { Product } from "../entities/product";
export type createOrderParams = {
  persona: {
    rfc: string;
    nombre: string;
    paterno: string;
    materno: string;
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
  productos: {
    idProducto: string;
    cantidad: string;
    ean: string;
  }[];
  receta: string;
};
export type NewOrderRepository = {
  getProduct(params: { description: string }): Promise<Product[]>;
  createOrder(params: createOrderParams): Promise<void>;
};
