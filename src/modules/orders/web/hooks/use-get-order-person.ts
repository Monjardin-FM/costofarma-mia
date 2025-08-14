import { useAsyncFn } from "react-use";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { getOrderPersonService } from "../../infraestructure/services/get-order-person";

export const useGetOrderPerson = () => {
  const [{ value: orderPerson, loading, error }, getOrderPerson] = useAsyncFn<
    OrderRepository["getOrderPerson"]
  >(getOrderPersonService, [getOrderPersonService]);

  return {
    orderPerson,
    loading,
    error,
    getOrderPerson,
  };
};
