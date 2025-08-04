import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { TrackingPlusRepository } from "../../domain/respository/tracking-plus-repository";

export const showAlertsService: TrackingPlusRepository["showAlerts"] = async (
  params
) => {
  const response = await api().post("Position/ShowAlert", {
    headers: {
      Authorization: `Bearer ${token()}`,
      //   'Content-Type': 'application/json',
    },
    json: params,
  });
  await verifyResponse({ response });
};
