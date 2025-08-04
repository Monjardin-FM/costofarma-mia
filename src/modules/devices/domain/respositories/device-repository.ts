import { Device } from "../entities/device";
import {
  DeviceHistoricPosition,
  DevicePosition,
} from "../entities/device-position";

export type DeviceRepository = {
  getDevice(params: { completeName: string }): Promise<Device[]>;
  getDeviceById(params: { idDevice: number }): Promise<Device>;
  createDevice(params: {
    idDeviceType: number;
    description: string;
    status: string;
    idStatus: number;
  }): Promise<void>;
  updateDevice(params: {
    idDevice: number;
    idDeviceType: number;
    description: string;
    status: string;
    idStatus: number;
  }): Promise<void>;
  deleteDevice(params: { idDevice: number }): Promise<Boolean>;
  getPositionDevice(params: { imei: string }): Promise<DevicePosition[]>;
  getHistoricPositionDevice(params: {
    dateInit: string;
    dateFin: string;
    deviceId: string;
  }): Promise<DeviceHistoricPosition[]>;
};
