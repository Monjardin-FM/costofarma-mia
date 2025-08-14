import { useAsyncFn } from "react-use";
import { OrderRepository } from "../../domain/repositories/order-repository";
import { getPersonService } from "../../infraestructure/services/get-person";

export const useGetPerson = () => {
  const [{ value: person, loading, error }, getPerson] = useAsyncFn<
    OrderRepository["getPerson"]
  >(getPersonService, [getPersonService]);

  return {
    person,
    loading,
    error,
    getPerson,
  };
};
