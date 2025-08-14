import { useAsyncFn } from "react-use";
import { NewOrderRepository } from "../../domain/repositories/new-order-repository";
import { getProductService } from "../../infraestructure/services/get-product";

export const useGetProduct = () => {
  const [{ value: products, loading, error }, getProduct] = useAsyncFn<
    NewOrderRepository["getProduct"]
  >(getProductService, [getProductService]);

  return {
    products,
    loading,
    error,
    getProduct,
  };
};
