import { createReferenceContactService } from "./../../../infraestructure/services/reference-contact/post-reference-contact";
import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";

export const useCreateReferenceContact = () => {
  const [{ loading, error }, createReferenceContact] = useAsyncFn<
    DefendantRepository["createReferenceContact"]
  >(createReferenceContactService, [createReferenceContactService]);
  return {
    createReferenceContact,
    loading,
    error,
  };
};
