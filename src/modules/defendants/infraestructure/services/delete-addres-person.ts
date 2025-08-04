import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const deleteAddressPersonService: DefendantRepository["deleteAddressPerson"] =
  async (params) => {
    const response = await api().delete(`Address/${params.idAddress}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    const { body } = await verifyResponse({ response });
    return body.data.result;
  };
