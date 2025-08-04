export type AlarmDefendant = {
  idPerson: number;
  idPersonSpecificAlarm: number;
  idStatus: number;
  idSpecificAlarmType: number;
  specificAlarmType: string;
};

type LGeofence = {
  geofence: string;
  idAlarmType: number;
  idGeofence: number;
};

export type AlarmExceptionSchedule = {
  alarmExceptionType: number;
  dateFinish: string;
  dateInit: string;
  strDays: string;
};

export type Intervals = {
  name: string;
  start: string;
  end: string;
  days: number[];
};
export type StrDays = {
  intervals: Intervals[];
};
export type AlarmDefendantById = {
  alarmException: AlarmExceptionSchedule[];
  idPerson: number;
  idPersonSpecificAlarm: number;
  idStatus: number;
  idspecificAlarmType: number;
  // specificAlarmType: string;
  lGeofence: LGeofence[];
  name: string;
};
