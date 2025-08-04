import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";
export const updateAlarmService: AlarmRepository["updateAlarm"] = async (
  params
) => {
  const response = await api().put("AlarmType", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
