import { City } from '../entities/city';
import { DeviceType } from '../entities/device-type';
import { ResponseDevice } from '../entities/response-device';
import { SpecificAlarm } from '../entities/specific-alarm';

export type CatalogRepository = {
  getResponseDevices(): Promise<ResponseDevice[]>;
  getDeviceType(): Promise<DeviceType[]>;
  getSpecificAlarm(): Promise<SpecificAlarm[]>;
  getCities(): Promise<City[]>;
};
