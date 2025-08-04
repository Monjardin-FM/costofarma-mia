import { api } from "../../../../utils/api";
import { token } from "../../../../utils/token";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";

export const saveUserService: UserManageRepository["saveUser"] = async (
  params
) => {
  const response = await api().post("User", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
    json: params,
  });
  const { body } = await verifyResponse({ response });
  return body;
};
const verifyResponse = async ({ response }: { response?: Response }) => {
  if (!response || !response.ok) {
    throw new Error("An error occurred during the call to the web service");
  }

  const body = await response.json();

  return { body };
};
