import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const postNotificationService: TrackingRepository["postNofitication"] =
  async (params) => {
    const response = await api().post("Common/Notification", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    await verifyResponse({ response });
  };
