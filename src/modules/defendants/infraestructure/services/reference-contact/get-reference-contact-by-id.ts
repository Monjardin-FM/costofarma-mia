import { api } from "../../../../../utils/api";
import { verifyResponse } from "../../../../../utils/check-response";
import { token } from "../../../../../utils/token";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";

export const getReferenceContactByIdService: DefendantRepository["getReferenceContactById"] =
  async (params) => {
    const response = await api().get(
      `ReferencePerson/id/${params.referenceId}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    const { body } = await verifyResponse({ response });
    const data = body.data as any;

    const referenceContactById = {
      idPerson: data.idPerson,
      idReferencePerson: data.idReferencePerson,
      name: data.name,
      phoneNumber: data.phoneNumber,
      relationship: data.relationship,
      address: data.address,
    };
    return referenceContactById;
  };
