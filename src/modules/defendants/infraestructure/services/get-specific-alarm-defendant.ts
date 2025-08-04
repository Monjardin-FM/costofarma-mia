import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { AlarmDefendant } from "../../domain/entities/alarm-defendant";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getAlarmDefendantService: DefendantRepository["getSpecificAlarmDefendant"] =
  async (params) => {
    const response = await api().get(`SpecificAlarm/${params.idPerson}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const alarmDefendant = data.map<AlarmDefendant>((defendant) => ({
      idPerson: defendant.idPerson,
      idPersonSpecificAlarm: defendant.idPersonSpecificAlarm,
      idStatus: defendant.idStatus,
      idSpecificAlarmType: defendant.idspecifiAlarmType,
      specificAlarmType: defendant.specificAlarmType,
    }));
    return alarmDefendant;
  };
