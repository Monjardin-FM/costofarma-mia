import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const downloadFileService: DefendantRepository["downloadFile"] = async (
  params
) => {
  const response = await api().get(`Defendant/${params.idPerson}/attachment`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  return data;
};
