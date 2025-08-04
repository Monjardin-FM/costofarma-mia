import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";

export const deleteUserService: UserManageRepository["deleteUser"] = async (
  params
) => {
  const response = await api().delete(`User`, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    searchParams: { idPerson: params.idPerson },
  });
  const { body } = await verifyResponse({ response });
  return body.data.result;
};
