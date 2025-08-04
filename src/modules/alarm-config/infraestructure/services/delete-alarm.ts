import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";

export const deleteAlarmService: AlarmRepository["deleteAlarmType"] = async (
  params
) => {
  const response = await api().delete(`AlarmType/${params.idAlarmType}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  return body.data.result;
};
