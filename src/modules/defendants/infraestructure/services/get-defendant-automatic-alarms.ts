import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { AutomaticAlarmsDefendant } from "../../domain/entities/automatic-alarm-defendant";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getDefendantAutomaticAlarmsService: DefendantRepository["getDefendantAlarms"] =
  async (params) => {
    const response = await api().get(`Defendant/${params.idPerson}/Alarm`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      // searchParams: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const alarms = data.map<AutomaticAlarmsDefendant>((alarm) => ({
      automatic: alarm.automatic,
      description: alarm.description,
      dynamicDistance: alarm.dynamicDistance,
      enableResponseCall: alarm.enableResponseCall,
      geocordinateTimeout: alarm.geocordinateTimeout,
      idAlarm: alarm.idAlarm,
      idAlarmType: alarm.idAlarmType,
      idPerson: alarm.idPerson,
      idStatus: alarm.idStatus,
      resolveTime: alarm.resolveTime,
      responseInterval: alarm.responseInterval,
    }));
    return alarms;
  };
