import { OrdenPerson } from "../entities/OrdenPerson";
import { OrderDetail } from "../entities/OrderDetail";
import { Person } from "../entities/Person";

export type OrderRepository = {
  getPerson(params: { rfc: string }): Promise<Person>;
  getOrderPerson(params: { idPerson: number }): Promise<OrdenPerson[]>;
  getOrderDetail(params: { idOrden: number }): Promise<OrderDetail[]>;
  deleteOrder(parasm: { idOrden: number }): Promise<void>;
};
