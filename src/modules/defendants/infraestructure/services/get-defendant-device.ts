import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantDevice } from "../../domain/entities/defendant-device";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getDefendantDeviceService: DefendantRepository["getDeviceDefendant"] =
  async (params) => {
    const response = await api().get(`PersonDevice/${params.idDefendant}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      // searchParams: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const defendants = data.map<DefendantDevice>((defendant) => ({
      deviceType: defendant.deviceType,
      idDevice: defendant.idDevice,
      idDeviceType: defendant.idDeviceType,
      idPerson: defendant.idPerson,
      idPersonDevice: defendant.idPersonDevice,
      idStatus: defendant.idStatus,
      imei: defendant.imei,
    }));
    return defendants;
  };
