import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Phone } from "../../domain/entities/phone";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getPhonePersonService: DefendantRepository["getPhonePerson"] =
  async (params) => {
    const response = await api().get(`Phone/${params.idPerson}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      // searchParams: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const Phone = data.map<Phone>((phone) => ({
      idPerson: phone.idPerson,
      phone: phone.phone,
      idPhonePerson: phone.idPhonePerson,
      idPhoneType: phone.idPhoneType,
      idStatus: phone.idStatus,
    }));
    return Phone;
  };
