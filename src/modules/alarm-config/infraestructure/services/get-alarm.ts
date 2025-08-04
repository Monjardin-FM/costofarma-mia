import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Alarm } from "../../domain/entities/alarms";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";

export const getAlarmsService: AlarmRepository["getAlarms"] = async (
  params
) => {
  const response = await api().get("AlarmType", {
    headers: {
      Authorization: `Bearer ${token()}`,
      //   'Content-Type': 'application/json',
    },
    searchParams: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const alarms = data.map<Alarm>((alarm) => ({
    idAlarmType: alarm.idAlarmType,
    description: alarm.description,
    automatic: alarm.automatic,
    responseInterval: alarm.responseInterval,
    geocordinateTimeout: alarm.geocordinateTimeout,
    dynamicDistance: alarm.dynamicDistance,
    enableResponseCall: alarm.enableResponseCall,
    resolveTime: alarm.resolveTime,
    callText: alarm.callText,
    smsText: alarm.smsText,
    mailText: alarm.mailText,
    idStatus: alarm.idStatus,
  }));
  return alarms;
};
