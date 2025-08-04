import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const checkNotificationService: TrackingRepository["checkNotification"] =
  async (params) => {
    const response = await api().put(
      `Common/Notification/${params.idNotification}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        json: params,
      }
    );

    await verifyResponse({ response });
  };
