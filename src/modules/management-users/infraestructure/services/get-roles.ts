import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { Role } from "../../domain/entities/role";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";

export const getRolesService: UserManageRepository["getRole"] = async () => {
  const response = await api().get("Catalog/Role", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const roles = data.map<Role>((role) => ({
    idRole: role.idRole,
    role: role.role,
  }));
  return roles;
};
