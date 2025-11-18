import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Broker } from "../../domain/entities/Broker";
import { BrokerRepository } from "../../domain/repositories/broker-repository";

export const getBrokerService: BrokerRepository["getBrokers"] = async () => {
  const response = await api().get("Catalog/Broker", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];
  const brokers = data.map<Broker>((broker) => ({
    idBroker: broker.idBroker,
    descripcion: broker.descripcion,
  }));
  return brokers;
};
