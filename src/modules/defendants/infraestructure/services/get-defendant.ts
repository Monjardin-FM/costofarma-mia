import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Defendant } from "../../domain/entities/defendant";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getDefendantsService: DefendantRepository["getDefendant"] = async (
  params
) => {
  const response = await api().get(`Defendant`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      // 'Content-Type': 'application/json',
    },
    searchParams: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const defendants = data.map<Defendant>((defendant) => ({
    idDefendant: defendant.idDefendant,
    idPerson: defendant.idPerson,
    idOfficer: defendant.idOfficer,
    name: defendant.name,
    lastName: defendant.lastName,
    idCounty: defendant.idCounty,
    eMail: defendant.eMail,
    birthDate: defendant.birthDate,
    idGender: defendant.idGender,
    idPersonType: defendant.idPersonType,
    idStatus: defendant.idStatus,
    createdAt: defendant.created_at,
    idRole: defendant.idRole,
    caseNumber: defendant.caseNumber,
    deviceId: defendant.deviceId,
    idDeviceType: defendant.idDeviceType,
    sid: defendant.sid,
    role: defendant.role,
    userName: defendant.userName,
  }));
  return defendants;
};
