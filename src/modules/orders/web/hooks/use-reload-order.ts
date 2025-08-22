import { useAsyncFn } from "react-use";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { reloadOrderService } from "../../infraestructure/services/reload-order";

export const useReloadOrder = () => {
  const [{ error, loading }, reloadOrder] = useAsyncFn<
    OrderRepository["reloadOrder"]
  >(reloadOrderService, [reloadOrderService]);
  return {
    reloadOrder,
    error,
    loading,
  };
};
