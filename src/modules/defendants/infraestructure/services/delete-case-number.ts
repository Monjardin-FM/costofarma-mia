import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const deleteCaseNumberService: DefendantRepository["deleteCaseNumber"] =
  async (params) => {
    const response = await api().delete(
      `Defendant/CaseNumber/${params.idCaseNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    const { body } = await verifyResponse({ response });
    return body.data.result;
  };
