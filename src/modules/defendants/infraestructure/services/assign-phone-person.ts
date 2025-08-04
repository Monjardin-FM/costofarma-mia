import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const assignPhonePersonService: DefendantRepository["assignPhone"] =
  async (params) => {
    const response = await api().post(`Phone`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      json: params,
    });
    await verifyResponse({ response });
  };
