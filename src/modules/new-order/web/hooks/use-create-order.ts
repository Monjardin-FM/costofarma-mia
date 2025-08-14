import { useAsyncFn } from "react-use";
import { NewOrderRepository } from "../../domain/repositories/new-order-repository";
import { createOrderService } from "../../infraestructure/services/create-order";

export const useCreateNewOrder = () => {
  const [{ error, loading }, createNewOrder] = useAsyncFn<
    NewOrderRepository["createOrder"]
  >(createOrderService, [createOrderService]);
  return {
    createNewOrder,
    error,
    loading,
  };
};
