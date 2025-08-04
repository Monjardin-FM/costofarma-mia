import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { VictimRepository } from "../../domain/repositories/victim-repository";

export const getVictimByIdService: VictimRepository["getVictimById"] = async (
  params
) => {
  const response = await api().get(`Victim/id/${params.idPerson}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: {
      completeName: params.completeName,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const victims = {
    idDefendant: data.idDefendant,
    idPerson: data.idPerson,
    idOfficer: data.idOfficer,
    name: data.name,
    lastName: data.lastName,
    idCounty: data.idCounty,
    eMail: data.eMail,
    birthDate: data.birthDate,
    idGender: data.idGender,
    idPersonType: data.idPersonType,
    idStatus: data.idStatus,
    createdAt: data.created_at,
    idRole: data.idRole,
    phone: data.phone,
    deviceId: data.deviceId,
    idDeviceType: data.idDeviceType,
    showalerts: data.showalerts,
    userName: data.userName,
    caseNumber: data.caseNumber,
  };
  return victims;
};
