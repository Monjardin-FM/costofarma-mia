import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";

export const createAlarmService: AlarmRepository["createAlarm"] = async (
  params
) => {
  const response = await api().post("AlarmType", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  await verifyResponse({ response });
};
