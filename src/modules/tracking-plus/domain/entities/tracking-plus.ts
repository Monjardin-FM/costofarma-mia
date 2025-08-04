export type AlertsTracking = {
  timestamp: string;
  alarmName: string;
  device1Latitude: number;
  device1Longitude: number;
  seqMachineState: boolean;
  personId: number;
};

export type TrackingPlus = {
  personId: number;
  name: string;
  lastName: string;
  showalerts: boolean;
  officer: string;
  phone: string;
  alerts: AlertsTracking[];
};
