import { useAsyncFn } from "react-use";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { getPersonByIdService } from "../../infraestructure/services/get-person-by-id";

export const usegetPersonById = () => {
  const [{ value: personById, loading, error }, getPersonById] = useAsyncFn<
    OrderRepository["getPersonById"]
  >(getPersonByIdService, [getPersonByIdService]);

  return {
    personById,
    loading,
    error,
    getPersonById,
  };
};
