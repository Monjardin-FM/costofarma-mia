import { Broker } from "../entities/Broker";

export type BrokerRepository = {
  getBrokers: () => Promise<Broker[]>;
};
