import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { UserManage } from "../../domain/entities/userManage";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";

export const getUsersService: UserManageRepository["getUsers"] = async (
  params
) => {
  const response = await api().get("User", {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    searchParams: params,
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const users = data.map<UserManage>((user) => ({
    idDefendant: user.idDefendant,
    idPerson: user.idPerson,
    idOfficer: user.idOfficer,
    name: user.name,
    lastName: user.lastName,
    idCounty: user.idCounty,
    eMail: user.eMail,
    birthDate: user.birthDate,
    idGender: user.idGender,
    idPersonType: user.idPersonType,
    idStatus: user.idStatus,
    createdAt: user.created_at,
    idRole: user.idRole,
    role: user.role,
    caseNumber: user.caseNumber,
    deviceId: user.deviceId,
    idDeviceType: user.idDeviceType,
    sid: user.sid,
    userName: user.userName,
    // phone: user.phone,
  }));
  return users;
};
