import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { AlarmDefendantDetail } from "../../domain/entities/alarm-defendant-detail";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getDefendantAlarmDetailService: DefendantRepository["getAlarmDefendantDetail"] =
  async (params) => {
    const response = await api().get(
      `Defendant/${params.idDefendant}/AlarmDetail/${params.idAlarmType}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          // 'Content-Type': 'application/json',
        },
        // searchParams: params,
      }
    );
    const { body } = await verifyResponse({ response });
    const data = body.data as any;

    const alarmDetail: AlarmDefendantDetail = {
      idAlarmType: data.idAlarmType,
      automatic: data.automatic,
      responseInterval: data.responseInterval,
      geocordinateTimeout: data.geocordinateTimeout,
      dynamicDistance: data.dynamicDistance,
      enableResponseCall: data.enable,
      resolveTime: data.resolveTime,
      callText: data.callText,
      smsText: data.smsText,
      mailText: data.mailText,
      idStatus: data.idStatus,
      idPerson: data.idPerson,
      idAlarm: data.idAlarm,
    };
    return alarmDetail;
  };
