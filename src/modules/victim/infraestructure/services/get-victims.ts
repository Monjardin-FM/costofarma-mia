import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Victim } from "../../domain/entities/victim";
import { VictimRepository } from "../../domain/repositories/victim-repository";

export const getVictimsService: VictimRepository["getVictimDefendant"] = async (
  params
) => {
  const response = await api().get(`Victim/${params.idDefendant}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    // search: {
    //   completeName: params.completeName,
    // },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const victims = data.map<Victim>((victim) => ({
    idDefendant: victim.idDefendant,
    idPerson: victim.idPerson,
    idOfficer: victim.idOfficer,
    name: victim.name,
    lastName: victim.lastName,
    idCounty: victim.idCounty,
    eMail: victim.eMail,
    birthDate: victim.birthDate,
    idGender: victim.idGender,
    idPersonType: victim.idPersonType,
    idStatus: victim.idStatus,
    createdAt: victim.created_at,
    idRole: victim.idRole,
    deviceId: victim.deviceId,
    idDeviceType: victim.idDeviceType,
    role: victim.role,
    caseNumber: victim.caseNumber,
    sid: victim.role,
    userName: victim.userName,
  }));
  return victims;
};
