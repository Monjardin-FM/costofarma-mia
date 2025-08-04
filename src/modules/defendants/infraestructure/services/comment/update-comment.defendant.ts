import { api } from "../../../../../utils/api";
import { verifyResponse } from "../../../../../utils/check-response";
import { token } from "../../../../../utils/token";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";

export const updateCommentDefendantService: DefendantRepository["updateCommentDefendant"] =
  async (params) => {
    const response = await api().put(`Common/Comment`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      json: params,
    });

    await verifyResponse({ response });
  };
