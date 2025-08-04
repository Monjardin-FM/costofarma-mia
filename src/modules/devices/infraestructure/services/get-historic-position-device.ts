import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DeviceHistoricPosition } from "../../domain/entities/device-position";
import { DeviceRepository } from "../../domain/respositories/device-repository";

export const getHistoricPositionDeviceService: DeviceRepository["getHistoricPositionDevice"] =
  async (params) => {
    const response = await api().post("Device/HistoricPosition", {
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
      },
      json: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const positionDevice = data.map<DeviceHistoricPosition>((device) => ({
      dateInit: device.dateInit,
      dateFin: device.dateFin,
      positionDate: device.positionDate,
      battery: device.battery,
      lat: device.lat,
      lon: device.lon,
      type: device.type,
      cardioFrequency: device.cardioFrequency,
      bloodOxygen: device.bloodOxygen,
      //   positionType: device.positionType,
      delta: device.delta,
      idPerson: device.idPerson,
      position_type: device.position_type,
      idDeviceType: device.iddeviceType,
    }));
    return positionDevice;
  };
