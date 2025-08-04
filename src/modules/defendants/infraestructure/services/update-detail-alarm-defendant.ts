import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const updateDefendantDetailAlarmService: DefendantRepository["updateAlarmDefendantDetail"] =
  async (params) => {
    const response = await api().put("Defendant/AlarmDetail", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });
    await verifyResponse({ response });
  };
