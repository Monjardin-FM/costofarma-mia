import { useAsyncFn } from "react-use";
import { deleteOrderService } from "../../infraestructure/services/delete-order";
import { OrderRepository } from "../../domain/repositories/order-repository";

export const useDeleteOrder = () => {
  const [{ loading, error }, deleteOrder] = useAsyncFn<
    OrderRepository["deleteOrder"]
  >(deleteOrderService, [deleteOrderService]);
  return {
    loading,
    error,
    deleteOrder,
  };
};
