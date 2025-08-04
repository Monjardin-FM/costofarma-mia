import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const createScheduleAlarmDefendantService: DefendantRepository["postScheduleAlarmDefendant"] =
  async (params) => {
    const response = await api().post(
      `Defendant/${params.idDefendant}/ScheduleAlarm/${params.idAlarmType}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
        json: {
          description: params.description,
          alarmException: params.alarmException,
        },
      }
    );

    await verifyResponse({ response });
  };
