import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { TrackingPlus } from "../../domain/entities/tracking-plus";
import { TrackingPlusRepository } from "../../domain/respository/tracking-plus-repository";

export const getTrackingPlusService: TrackingPlusRepository["getTrackingPlus"] =
  async () => {
    const response = await api().get("Position/AlertsPlus", {
      headers: {
        Authorization: `Bearer ${token()}`,
        //   'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const tracking = data.map<TrackingPlus>((track) => ({
      personId: track.personId,
      name: track.name,
      lastName: track.lastName,
      officer: track.officer,
      phone: track.phone,
      showalerts: track.showalerts,
      alerts: track.alerts,
    }));
    return tracking;
  };
