import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { getTypeCommunicationService } from "../../infraestructure/services/get-type-communication";

export const useGetTypeCommunication = () => {
  const [{ value: typeCommunication, loading, error }, getTypeCommunication] =
    useAsyncFn<TrackingRepository["getTypeCommunication"]>(
      getTypeCommunicationService,
      [getTypeCommunicationService]
    );
  return {
    typeCommunication,
    loading,
    error,
    getTypeCommunication,
  };
};
