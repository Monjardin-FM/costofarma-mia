import { api } from "../../../../../utils/api";
import { verifyResponse } from "../../../../../utils/check-response";
import { token } from "../../../../../utils/token";
import { CommentDefendant } from "../../../domain/entities/comment";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";

export const getCommentDefendantService: DefendantRepository["getCommentDefendant"] =
  async (params) => {
    const response = await api().get(`Common/Comment/${params.idPerson}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        // 'Content-Type': 'application/json',
      },
      // searchParams: params,
    });
    const { body } = await verifyResponse({ response });
    const data = body.data as any;

    const commentDefendant: CommentDefendant = {
      idDefendant: data.idDefendant,
      idComment: data.idComment,
      comment: data.comment,
      fecAlta: data.fecAlta,
      idStatus: data.idStatus,
    };
    return commentDefendant;
  };
