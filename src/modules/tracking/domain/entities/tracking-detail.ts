export type Person = {
  idDefendant: number;
  idPerson: number;
  idOfficer: number;
  name: string;
  lastName: string;
  idCounty: number;
  birthDate: string;
  idGender: number;
  idPersonType: number;
  idStatus: number;
  createdAt: string;
  idRole: number;
  deviceId: number;
  idDeviceType: number;
  imei: string;
  officer: string;
  phone: string;
  showAlert: false;
  personPosition: {
    battery: number;
    bloodOxygen: number;
    cardioFrequency: number;
    dateInit: string;
    dateFin: string;
    delta: number;
    geofences: Geofences[];
    idPerson: number;
    iddeviceType: number;
    lat: number;
    lon: number;
    positionDate: string;
    positionType: string;
    positiontype: number;
    type: number;
  };
};

export type Geofences = {
  idGeofence: number;
  geofence: string;
  idAlarmType: number;
  name: string;
};
export type PersonAlert = {
  timestamp: string;
  alarmName: string;
  device1Latitude: number;
  device1Longitude: number;
  seqMachineState: boolean;
  personId: number;
};

export type TrackingDetail = {
  person: Person[];
  personAlert: PersonAlert[];
};
