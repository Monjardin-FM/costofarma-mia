import { useAsyncFn } from "react-use";
import { BrokerRepository } from "../../domain/repositories/broker-repository";
import { getBrokerService } from "../../infraestructure/services/get-broker";

export const useGetBrokers = () => {
  const [{ value: brokers, loading, error }, getBrokers] = useAsyncFn<
    BrokerRepository["getBrokers"]
  >(getBrokerService, [getBrokerService]);
  return {
    brokers,
    loading,
    error,
    getBrokers,
  };
};
