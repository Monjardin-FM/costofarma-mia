import { OrdenPerson } from "../entities/OrdenPerson";
import { OrderByPerson } from "../entities/OrderByPerson";
import { OrderDetail } from "../entities/OrderDetail";
import { Person } from "../entities/Person";
export type reloadOrderParams = {
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
  }[];
  receta: string;
};
export type OrderRepository = {
  getPerson(params: { rfc: string }): Promise<Person>;
  getOrderPerson(params: { idPerson: number }): Promise<OrdenPerson[]>;
  getOrderDetail(params: { idOrder: number }): Promise<OrderDetail[]>;
  deleteOrder(params: { idOrden: number }): Promise<Boolean>;
  getOrdenByPerson(): Promise<OrderByPerson[]>;
  reloadOrder(params: reloadOrderParams, idPerson: number): Promise<void>;
};
