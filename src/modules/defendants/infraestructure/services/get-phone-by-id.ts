import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { PhoneById } from "../../domain/entities/phone";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const getPhoneByIdService: DefendantRepository["getPhoneById"] = async (
  params
) => {
  const response = await api().get(`Phone/id/${params.idPhone}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      // 'Content-Type': 'application/json',
    },
    // searchParams: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const Phone: PhoneById = {
    idPhone: data.idPhone,
    phone: data.phone,
  };
  return Phone;
};
