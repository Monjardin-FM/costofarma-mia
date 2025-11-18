import { Aseguradora } from "../entities/Aseguradora";

export type AseguradoraRepository = {
  getAseguradoras: () => Promise<Aseguradora[]>;
};
