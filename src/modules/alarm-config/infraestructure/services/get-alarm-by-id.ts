import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { AlarmRepository } from "../../domain/repositories/alarm-repository";

export const getAlarmByIdService: AlarmRepository["getAlarmById"] = async (
  params
) => {
  const response = await api().get(`AlarmType/Id/${params.idAlarmType}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      //   'Content-Type': 'application/json',
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const alarm = {
    idAlarmType: data.idAlarmType,
    description: data.description,
    automatic: data.automatic,
    responseInterval: data.responseInterval,
    geocordinateTimeout: data.geocordinateTimeout,
    dynamicDistance: data.dynamicDistance,
    enableResponseCall: data.enableResponseCall,
    resolveTime: data.resolveTime,
    callText: data.callText,
    smsText: data.smsText,
    mailText: data.mailText,
    idStatus: data.idStatus,
    lResponseDevice: data.lResponseDevice,
    lAssignedDevice: data.lAssignedDevice,
    idPerson: data.idPerson,
    idDevice: data.idDevice,
  };
  return alarm;
};
