import { api } from "../../../../utils/api";
import { token } from "../../../../utils/token";
import { DefendantRepository } from "../../domain/repositories/defendant-repository";

export const createDefendantService: DefendantRepository["createDefendant"] =
  async (params) => {
    const response = await api().post("Defendant", {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    const { body } = await verifyResponse({ response });

    // const id: number = body.data || 0;
    return body;
  };

const verifyResponse = async ({ response }: { response?: Response }) => {
  if (!response || !response.ok) {
    throw new Error("An error occurred during the call to the web service");
  }

  const body = await response.json();

  return { body };
};
