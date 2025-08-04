export type AlertsTracking = {
  timestamp: string;
  alarmName: string;
  device1Latitude: number;
  device1Longitude: number;
  seqMachineState: boolean;
  personId: number;
};

export type Tracking = {
  personId: number;
  name: string;
  lastName: string;
  alerts: AlertsTracking[];
};
