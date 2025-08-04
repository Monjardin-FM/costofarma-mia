import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { CatalogRepository } from "../../domain/repositories/catalog-repository";
import { City } from "../../domain/entities/city";

export const getCityService: CatalogRepository["getCities"] = async () => {
  const response = await api().get("Catalog/City", {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
  });
  const { body } = await verifyResponse({ response });
  const data = body.data as any[];

  const cities = data.map<City>((city) => ({
    city: city.city,
    idCity: city.idCity,
  }));
  return cities;
};
