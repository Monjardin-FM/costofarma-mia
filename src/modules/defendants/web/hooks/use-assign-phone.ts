import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";
import { assignPhonePersonService } from "../../infraestructure/services/assign-phone-person";

export const useAssignPhonePerson = () => {
  const [{ loading, error }, assignPhonePerson] = useAsyncFn<
    DefendantRepository["assignPhone"]
  >(assignPhonePersonService, [assignPhonePersonService]);
  return {
    loading,
    error,
    assignPhonePerson,
  };
};
