export type Alarm = {
  idAlarmType: number;
  description: string;
  automatic: boolean;
  responseInterval: number;
  geocordinateTimeout: number;
  dynamicDistance: number;
  enableResponseCall: boolean;
  resolveTime: number;
  callText: string;
  smsText: string;
  mailText: string;
  idStatus: number;
};
