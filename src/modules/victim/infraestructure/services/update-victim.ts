import { api } from "../../../../utils/api";
import { token } from "../../../../utils/token";
import { VictimRepository } from "../../domain/repositories/victim-repository";

export const updateVictimService: VictimRepository["updateVictim"] = async (
  params
) => {
  const response = await api().put("Victim", {
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
