import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getDefendantByIdService: DefendantRepository["getDefendantById"] =
  async (params) => {
    const response = await api().get(`Defendant/Id/${params.idPerson}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ completeName: params.completeName }),
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any;

    const defendantByID = {
      birthDate: data.birthDate,
      caseNumber: data.caseNumber,
      createdAt: data.created_at,
      deviceId: data.deviceId,
      eMail: data.eMail,
      idCounty: data.idCounty,
      idDefendant: data.idDefendant,
      idDeviceType: data.idDeviceType,
      idGender: data.idGender,
      idOfficer: data.idOfficer,
      idPerson: data.idPerson,
      idPersonType: data.idPersonType,
      idRole: data.idRole,
      idStatus: data.idStatus,
      lastName: data.lastName,
      name: data.name,
      notes: data.notes,
      offense: data.offense,
      officer: data.officer,
      phone: data.phone,
      showalerts: data.showalerts,
      sid: data.sid,
      userName: data.userName,
    };
    return defendantByID;
  };
