import { useAsyncFn } from "react-use";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { getOrderDetailService } from "../../infraestructure/services/get-order-detail";

export const useGetOrderDetail = () => {
  const [{ value: orderDetail, loading, error }, getOrderDetail] = useAsyncFn<
    OrderRepository["getOrderDetail"]
  >(getOrderDetailService, [getOrderDetailService]);

  return {
    orderDetail,
    loading,
    error,
    getOrderDetail,
  };
};
