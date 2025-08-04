import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { PersonCommunication } from "../../domain/entities/person-communication";
import { TrackingRepository } from "../../domain/repositories/tracking-repository";

export const getPersonCommunicationService: TrackingRepository["getPersonCommunication"] =
  async (params) => {
    const response = await api().get(
      `Message/Communication/${params.idPerson}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          //   'Content-Type': 'application/json',
        },
      }
    );
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const personCommunication = data.map<PersonCommunication>((p) => ({
      idPerson: p.idPerson,
      idTypeCommunication: p.idTypeCommunication,
      typeCommunication: p.typeCommunication,
      message: p.message,
      fecAlta: p.fecAlta,
    }));
    return personCommunication;
  };
