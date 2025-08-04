import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";

export const getUserByIdService: UserManageRepository["getUserById"] = async (
  params
) => {
  const response = await api().get(`User/id/${params.idUser}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: {
      completeName: params.completeName,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any;

  const users = {
    birthDate: data.birthDate,
    createdAt: data.created_at,
    deviceId: data.deviceId,
    eMail: data.eMail,
    idCounty: data.idCounty,
    idDefendant: data.idDefendant,
    idDeviceType: data.idDeviceType,
    idGender: data.idGender,
    idOfficer: data.idOfficer,
    idPerson: data.idPerson,
    idPersonType: data.idPersonType,
    idRole: data.idRole,
    idStatus: data.idStatus,
    lastName: data.lastName,
    name: data.name,
    phone: data.phone,
    userName: data.userName,
  };
  return users;
};
