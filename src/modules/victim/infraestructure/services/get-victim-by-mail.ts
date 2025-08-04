import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { VictimMail } from "../../domain/entities/victim-mail";
import { VictimRepository } from "../../domain/repositories/victim-repository";

export const getVictimByMailService: VictimRepository["getVictimByMail"] =
  async (params) => {
    const response = await api().get(`Victim/Exist/${params.mail}`, {
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

    const victimMail = data.map<VictimMail>((victim) => ({
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
      idRole: victim.idRole,
      deviceId: victim.deviceId,
      idDeviceType: victim.idDeviceType,
      role: victim.role,
      caseNumber: victim.caseNumber,
      sid: victim.role,
      createdAt: victim.created_at,
      idVictim: victim.idVictim,
      showalerts: victim.showalerts,
    }));
    return victimMail;
  };
