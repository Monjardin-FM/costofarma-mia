// import { FeatureCollection } from "./geoJSON";

// Define un tipo para los días
type Day = {
  name: string;
};

// Define un tipo para la excepción de alarma basada en fecha
export type DateAlarmException = {
  dateInit: string;
  dateFinish: string;
  alarmExceptionType: number;
  description: string;
};

// Define un tipo para la excepción de alarma basada en días de la semana y horas
export type DayBasedAlarmException = {
  days: Day[];
  hourInit: string;
  hourEnd: string;
  alarmExceptionType: number;
  description: string;
};

// Define un tipo para el tipo de datos "alarmException"
export type AlarmException = DateAlarmException | DayBasedAlarmException;

// export type Geofence = {
//   // idGeofence?: number;
//   geofence: FeatureCollection;
// };
export type GeofenceParam = {
  geofence: string;
};
export type SpecificAlarmParams = {
  name: string;
  idPerson: number;
  idspecificAlarmType: number;
  idStatus: number;
  idPersonSpecificAlarm: number;
  lGeofence: GeofenceParam[];
  alarmException?: AlarmException[];
};
