import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { TrackingDetail } from "../../domain/entities/tracking-detail";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const getTrackingDetailService: TrackingRepository["getTrackingDetail"] =
  async (params) => {
    const response = await api().get(`Position/${params.personId}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        //   'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any;

    const trackingDetail: TrackingDetail = {
      person: data.person,
      personAlert: data.personAlert,
    };
    return trackingDetail;
  };
