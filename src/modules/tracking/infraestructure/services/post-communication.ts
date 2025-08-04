import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const postCommunicationService: TrackingRepository["postCommunication"] =
  async (params) => {
    const response = await api().post("Message/Communication", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    await verifyResponse({ response });
  };
