import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";
import { getReferenceContactService } from "../../../infraestructure/services/reference-contact/get-reference-contact";

export const useGetReferenceContact = () => {
  const [{ value: referenceContact, loading, error }, getReferenceContact] =
    useAsyncFn<DefendantRepository["getReferenceContact"]>(
      getReferenceContactService,
      [getReferenceContactService]
    );
  return {
    referenceContact,
    loading,
    error,
    getReferenceContact,
  };
};
