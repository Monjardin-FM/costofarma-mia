import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";
import { getCommentDefendantService } from "../../../infraestructure/services/comment/get-comment-defendant";

export const useGetCommentDefendant = () => {
  const [{ value: commentDefendant, loading, error }, getCommentDefendant] =
    useAsyncFn<DefendantRepository["getCommentDefendant"]>(
      getCommentDefendantService,
      [getCommentDefendantService]
    );
  return {
    commentDefendant,
    loading,
    error,
    getCommentDefendant,
  };
};
