import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { VictimRepository } from "../../domain/repositories/victim-repository";

export const assignDefendantVictimService: VictimRepository["assignDefendantVictim"] =
  async (params) => {
    const response = await api().post("Victim/Assign", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    await verifyResponse({ response });
  };
