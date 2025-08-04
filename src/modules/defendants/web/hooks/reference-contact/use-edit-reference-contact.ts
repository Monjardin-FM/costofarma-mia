import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";
import { updateReferenceContactService } from "../../../infraestructure/services/reference-contact/edit-reference-contact";

export const useEditReferenceContact = () => {
  const [{ loading, error }, editReferenceContact] = useAsyncFn<
    DefendantRepository["editReferenceContact"]
  >(updateReferenceContactService, [updateReferenceContactService]);
  return {
    editReferenceContact,
    loading,
    error,
  };
};
