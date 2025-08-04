import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Address } from "../../domain/entities/address";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getAddressPersonService: DefendantRepository["getAddressPerson"] =
  async (params) => {
    const response = await api().get(`Address/${params.idPerson}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      // searchParams: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const address = data.map<Address>((address) => ({
      addressType: address.addressType,
      idAddress: address.idAddress,
      idAddressType: address.idAddressType,
      idCity: address.idCity,
      city: address.city,
      idPerson: address.idPerson,
      idStatus: address.idStatus,
      streetAvenue: address.streetAvenue,
      zipCode: address.zipCode,
    }));
    return address;
  };
