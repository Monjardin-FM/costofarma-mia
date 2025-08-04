import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { County } from "../../domain/entities/county";
import { UserManageRepository } from "../../domain/repositories/user-manage-repository";

export const getCountyService: UserManageRepository["getCounty"] = async () => {
  const response = await api().get("Catalog/County", {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const county = data.map<County>((county) => ({
    county: county.county,
    idCounty: county.idCounty,
  }));
  return county;
};
