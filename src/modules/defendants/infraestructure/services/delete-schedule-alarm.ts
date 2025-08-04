import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const deleteScheduleAlarmService: DefendantRepository["deleteScheduleAlarm"] =
  async (params) => {
    const response = await api().delete(
      `Defendant/ScheduleAlarm/${params.idAlarm}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      }
    );
    const { body } = await verifyResponse({ response });
    return body.data.result;
  };
