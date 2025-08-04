import { useAsyncFn } from "react-use";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";
import { postCommunicationService } from "../../infraestructure/services/post-communication";

export const usePostCommunication = () => {
  const [{ error, loading }, sendCommunication] = useAsyncFn<
    TrackingRepository["postCommunication"]
  >(postCommunicationService, [postCommunicationService]);
  return {
    sendCommunication,
    error,
    loading,
  };
};
