import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DeviceType } from "../../domain/entities/device-type";
import { CatalogRepository } from "../../domain/repositories/catalog-repository";

export const getDeviceTypeService: CatalogRepository["getDeviceType"] =
  async () => {
    const response = await api().get("Catalog/DeviceType", {
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const deviceType = data.map<DeviceType>((device) => ({
      idDeviceType: device.idDeviceType,
      deviceType: device.deviceType,
    }));
    return deviceType;
  };
