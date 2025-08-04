import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { TypeCommunication } from "../../domain/entities/person-communication";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const getTypeCommunicationService: TrackingRepository["getTypeCommunication"] =
  async () => {
    const response = await api().get(`Message/TypeCommunication`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        //   'Content-Type': 'application/json',
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const TypeCommunication = data.map<TypeCommunication>((p) => ({
      idTypeCommunication: p.idTypecommunication,
      description: p.description,
    }));
    return TypeCommunication;
  };
