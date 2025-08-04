import { AlarmDefendantById } from "./../../domain/entities/alarm-defendant";
import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getAlarmDefendantByIdService: DefendantRepository["getSpecificAlarmById"] =
  async (params) => {
    const response = await api().get(
      `SpecificAlarm/id/${params.idPersonSpecificAlarm}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          // 'Content-Type': 'application/json',
        },
      }
    );
    const { body } = await verifyResponse({ response });
    const data = body.data as any;

    const alarmDefendant: AlarmDefendantById = {
      alarmException: data.alarmException,
      idPerson: data.idPerson,
      idPersonSpecificAlarm: data.idPersonSpecificAlarm,
      idStatus: data.idStatus,
      idspecificAlarmType: data.idspecificAlarmType,
      lGeofence: data.lGeofence,
      name: data.name,
    };
    return alarmDefendant;
  };
