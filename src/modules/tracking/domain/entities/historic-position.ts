export type HistoricPosition = {
  birthDate: string;
  completeName: string;
  createdAt: string;
  deviceId: number;
  geofences?: GeofenceHistoric[];
  historicPersonPosition: Historic[];
  idCounty: number;
  idDefendant: number;
  idDeviceType: number;
  idGender: number;
  idOfficer: number;
  idPerson: number;
  idPersonType: number;
  idRole: number;
  idStatus: number;
  showalerts: boolean;
};
export type GeofenceHistoric = {
  geofence: string;
  idGeofence: number;
  idAlarmType: number;
  name: string;
};
export type Historic = {
  battery: number;
  bloodOxygen: number;
  cardioFrequency: number;
  dateFin: string;
  dateInit: string;
  delta: number;
  idPerson: number;
  iddeviceType: number;
  lat: number;
  lon: number;
  positionDate: string;
  position_type: number;
  type: number;
};
