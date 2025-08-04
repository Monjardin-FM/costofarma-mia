import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DeviceRepository } from "../../domain/respositories/device-repository";

export const deleteDeviceService: DeviceRepository["deleteDevice"] = async (
  params
) => {
  const response = await api().delete(`Device/${params.idDevice}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  return body.data.result;
};
