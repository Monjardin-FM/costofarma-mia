import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getAddressByIdService: DefendantRepository["getAddressById"] =
  async (params) => {
    const response = await api().get(`Address/Id/${params.idAddress}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      // searchParams: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any;

    const address = {
      idAddress: data.idAddress,
      idPerson: data.idPerson,
      idAddressType: data.idAddressType,
      addressType: data.addressType,
      idCity: data.idCity,
      city: data.city,
      zipCode: data.zipCode,
      streetAvenue: data.streetAvenue,
      idStatus: data.idStatus,
    };
    return address;
  };
