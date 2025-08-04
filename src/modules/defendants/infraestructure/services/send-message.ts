import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const sendMessageService: DefendantRepository["sendMessageDefendant"] =
  async (params) => {
    const response = await api().post("Common/SMS", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    await verifyResponse({ response });
  };
