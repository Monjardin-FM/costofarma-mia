import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Tracking } from "../../domain/entities/tracking";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const getTrackingService: TrackingRepository["getTracking"] =
  async () => {
    const response = await api().get("Position/Alerts", {
      headers: {
        Authorization: `Bearer ${token()}`,
        //   'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const tracking = data.map<Tracking>((track) => ({
      personId: track.personId,
      name: track.name,
      lastName: track.lastName,
      alerts: track.alerts,
    }));
    return tracking;
  };
