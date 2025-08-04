import { HistoricPosition } from "../entities/historic-position";
import { NotificationTracking } from "../entities/notification";
import {
  PersonCommunication,
  TypeCommunication,
} from "../entities/person-communication";
import { Tracking } from "../entities/tracking";
import { TrackingDetail } from "../entities/tracking-detail";

export type TrackingRepository = {
  getTracking: () => Promise<Tracking[]>;
  getTrackingDetail: (params: { personId: number }) => Promise<TrackingDetail>;
  postHistoricPosition: (params: {
    dateInit: string;
    dateFin: string;
    idPerson: number;
  }) => Promise<HistoricPosition[]>;
  postNofitication: (params: {
    idDefendant: number;
    message: string;
  }) => Promise<void>;
  getNotification: () => Promise<NotificationTracking[]>;
  checkNotification: (params: { idNotification: number }) => Promise<void>;
  getPersonCommunication: (params: {
    idPerson: number;
  }) => Promise<PersonCommunication[]>;
  getTypeCommunication: () => Promise<TypeCommunication[]>;
  postCommunication: (params: {
    idPerson: number;
    idTypeCommunication: number;
    message: string;
    fecAlta: string;
  }) => Promise<void>;
};
