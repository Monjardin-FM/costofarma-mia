import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { sendMessageService } from "../../infraestructure/services/send-message";

export const useSendMessage = () => {
  const [{ error, loading }, sendMessage] = useAsyncFn<
    DefendantRepository["sendMessageDefendant"]
  >(sendMessageService, [sendMessageService]);
  return {
    sendMessage,
    error,
    loading,
  };
};
