import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";
import { deleteReferenceContactService } from "../../../infraestructure/services/reference-contact/delete-reference-contact";

export const useDeleteReferenceContact = () => {
  const [{ loading, error }, deleteReferenceContact] = useAsyncFn<
    DefendantRepository["deleteReferencePerson"]
  >(deleteReferenceContactService, [deleteReferenceContactService]);
  return {
    deleteReferenceContact,
    loading,
    error,
  };
};
