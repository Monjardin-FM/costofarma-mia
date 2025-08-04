import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { getPersonCommunicationService } from "../../infraestructure/services/get-person-communication";

export const useGetPersonCommunication = () => {
  const [
    { value: personCommunication, loading, error },
    getPersonCommunication,
  ] = useAsyncFn<TrackingRepository["getPersonCommunication"]>(
    getPersonCommunicationService,
    [getPersonCommunicationService]
  );
  return {
    personCommunication,
    loading,
    error,
    getPersonCommunication,
  };
};
