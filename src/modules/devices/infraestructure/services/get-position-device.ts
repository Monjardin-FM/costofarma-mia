import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DevicePosition } from "../../domain/entities/device-position";
import { DeviceRepository } from "../../domain/respositories/device-repository";

export const getPositionDeviceService: DeviceRepository["getPositionDevice"] =
  async (params) => {
    const response = await api().get(`Device/Position/${params.imei}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
      },
      //   searchParams: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const positionDevice = data.map<DevicePosition>((device) => ({
      dateInit: device.dateInit,
      dateFin: device.dateFin,
      positionDate: device.positionDate,
      battery: device.battery,
      lat: device.lat,
      lon: device.lon,
      type: device.type,
      cardioFrequency: device.cardioFrequency,
      bloodOxygen: device.bloodOxygen,
      positionType: device.positionType,
      delta: device.delta,
      idPerson: device.idPerson,
      position_type: device.position_type,
      idDeviceType: device.iddeviceType,
    }));
    return positionDevice;
  };
