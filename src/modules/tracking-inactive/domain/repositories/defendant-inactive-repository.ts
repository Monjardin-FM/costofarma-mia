import { HistoricPosition } from "../../../tracking/domain/entities/historic-position";
import { DefendantInactive } from "../entities/defendant-inactive";

export type DefendantInactiveRepository = {
  getDefendantInactive: () => Promise<DefendantInactive[]>;
  getHistoricPositionInactiveDefendant: (params: {
    dateInit: string;
    dateFin: string;
    idPerson: number;
  }) => Promise<HistoricPosition[]>;
};
