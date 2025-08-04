import { api } from "../../../../../utils/api";
import { verifyResponse } from "../../../../../utils/check-response";
import { token } from "../../../../../utils/token";
import { ReferenceContact } from "../../../domain/entities/reference-contact";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";

export const getReferenceContactService: DefendantRepository["getReferenceContact"] =
  async (params) => {
    const response = await api().get(`ReferencePerson/${params.idDefendant}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const referenceContact = data.map<ReferenceContact>((ref) => ({
      idPerson: ref.idPerson,
      idReferencePerson: ref.idReferencePerson,
      name: ref.name,
      phoneNumber: ref.phoneNumber,
      relationship: ref.relationship,
      address: ref.address,
    }));
    return referenceContact;
  };
