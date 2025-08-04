import { TrackingPlus } from "../entities/tracking-plus";

export type TrackingPlusRepository = {
  getTrackingPlus: () => Promise<TrackingPlus[]>;
  showAlerts: (params: {
    idPerson: number;
    showalerts: boolean;
  }) => Promise<void>;
};
