import { api } from "../../../../utils/api";
import { verifyResponse } from "../../../../utils/check-response";
import { token } from "../../../../utils/token";
import { SpecificAlarm } from "../../domain/entities/specific-alarm";
import { CatalogRepository } from "../../domain/repositories/catalog-repository";

export const getSpecificAlarmService: CatalogRepository["getSpecificAlarm"] =
  async () => {
    const response = await api().get("Catalog/SpecificAlarmType", {
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
      },
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any[];

    const specificAlarm = data.map<SpecificAlarm>((data) => ({
      idSpecificAlarmType: data.idSpecificAlarmType,
      specificAlarmType: data.specificAlarmType,
    }));
    return specificAlarm;
  };
