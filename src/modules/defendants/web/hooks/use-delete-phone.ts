import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { deletePhoneService } from "../../infraestructure/services/delete-phone-person";

export const useDeletePhonePerson = () => {
  const [{ loading, error }, deletePhonePerson] = useAsyncFn<
    DefendantRepository["deletePhone"]
  >(deletePhoneService, [deletePhoneService]);
  return {
    loading,
    error,
    deletePhonePerson,
  };
};
