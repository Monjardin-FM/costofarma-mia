export type DevicePosition = {
  dateInit: string;
  dateFin: string;
  positionDate: string;
  battery: number;
  lat: number;
  lon: number;
  type: number;
  cardioFrequency: number;
  bloodOxygen: number;
  positionType: string;
  delta: number;
  idPerson: number;
  position_type: number;
  idDeviceType: number;
};

export type DeviceHistoricPosition = {
  dateInit: string;
  dateFin: string;
  positionDate: string;
  battery: number;
  lat: number;
  lon: number;
  type: number;
  cardioFrequency: number;
  bloodOxygen: number;
  delta: number;
  idPerson: number;
  position_type: number;
  idDeviceType: number;
};
