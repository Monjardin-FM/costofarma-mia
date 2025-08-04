import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const updateDeviceDefendantService: DefendantRepository["updateDeviceDefendant"] =
  async (params) => {
    const response = await api().post("PersonDevice/Change", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });
    await verifyResponse({ response });
  };
