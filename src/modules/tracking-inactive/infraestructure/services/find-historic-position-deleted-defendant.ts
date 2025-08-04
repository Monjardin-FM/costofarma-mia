import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { HistoricPosition } from "../../../tracking/domain/entities/historic-position";
import { DefendantInactiveRepository } from "../../domain/repositories/defendant-inactive-repository";

export const findHistoricPositionDeletedDefendantService: DefendantInactiveRepository["getHistoricPositionInactiveDefendant"] =
  async (params) => {
    const response = await api().post("Position/HistoricDeleted", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    const { body } = await verifyResponse({ response });
    const data = body.data as any[];
    const historicPositions = data.map<HistoricPosition>((position) => ({
      birthDate: position.birthDate,
      completeName: position.completeName,
      createdAt: position.created_at,
      deviceId: position.deviceId,
      historicPersonPosition: position.historicPersonPosition,
      idCounty: position.idCounty,
      idDefendant: position.idDefendant,
      idDeviceType: position.idDeviceType,
      idGender: position.idGender,
      idOfficer: position.idOfficer,
      idPerson: position.idPerson,
      idPersonType: position.idPersonType,
      idRole: position.idRole,
      idStatus: position.idStatus,
      showalerts: position.showalerts,
      geofences: position.geofences,
    }));
    return historicPositions;
  };
