import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantInactive } from "../../domain/entities/defendant-inactive";
import { DefendantInactiveRepository } from "../../domain/repositories/defendant-inactive-repository";

export const getInactiveDefendantsService: DefendantInactiveRepository["getDefendantInactive"] =
  async () => {
    const response = await api().get(`Defendant/Deleted`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const defendants = data.map<DefendantInactive>((defendant) => ({
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
      showalerts: defendant.showalerts,
    }));
    return defendants;
  };
