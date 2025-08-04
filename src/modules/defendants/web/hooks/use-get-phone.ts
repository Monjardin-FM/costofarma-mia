import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { getPhonePersonService } from "../../infraestructure/services/get-phone";

export const useGetPhonePerson = () => {
  const [{ value: phonePerson, loading, error }, getPhonePerson] = useAsyncFn<
    DefendantRepository["getPhonePerson"]
  >(getPhonePersonService, [getPhonePersonService]);
  return {
    phonePerson,
    loading,
    error,
    getPhonePerson,
  };
};
