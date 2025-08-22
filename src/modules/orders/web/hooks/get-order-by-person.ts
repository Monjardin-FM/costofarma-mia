import { useAsyncFn } from "react-use";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { getOrderByPersonService } from "../../infraestructure/services/get-order-by-person";

export const useGetOrderByPerson = () => {
  const [{ value: ordersByPerson, loading, error }, getOrdersByPerson] =
    useAsyncFn<OrderRepository["getOrdenByPerson"]>(getOrderByPersonService, [
      getOrderByPersonService,
    ]);

  return {
    ordersByPerson,
    loading,
    error,
    getOrdersByPerson,
  };
};
