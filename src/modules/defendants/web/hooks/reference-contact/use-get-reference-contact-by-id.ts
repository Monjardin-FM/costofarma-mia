import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";
import { getReferenceContactByIdService } from "../../../infraestructure/services/reference-contact/get-reference-contact-by-id";

export const useGetReferenceContactById = () => {
  const [
    { value: referenceContactById, loading, error },
    getReferenceContactById,
  ] = useAsyncFn<DefendantRepository["getReferenceContactById"]>(
    getReferenceContactByIdService,
    [getReferenceContactByIdService]
  );
  return {
    referenceContactById,
    loading,
    error,
    getReferenceContactById,
  };
};
