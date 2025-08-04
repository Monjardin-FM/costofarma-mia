import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const uploadFileService: DefendantRepository["uploadFile"] = async (
  params
) => {
  const response = await api().post(`Defendant/${params.idPerson}/attachment`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
