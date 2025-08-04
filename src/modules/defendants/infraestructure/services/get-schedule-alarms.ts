import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { ScheduleAlarm } from "../../domain/entities/schedule-alarm";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getScheduleAlarmsService: DefendantRepository["getScheduleAlarms"] =
  async (params) => {
    const response = await api().get(
      `Defendant/${params.idDefendant}/ScheduleAlarm/${params.idAlarmType}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          // 'Content-Type': 'application/json',
        },
        // searchParams: params,
      }
    );
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const defendants = data.map<ScheduleAlarm>((schedule) => ({
      alarmExceptionType: schedule.alarmExceptionType,
      dateFinish: schedule.dateFinish,
      dateInit: schedule.dateInit,
      idAlarm: schedule.idAlarm,
      strDays: schedule.strDays,
    }));
    return defendants;
  };
