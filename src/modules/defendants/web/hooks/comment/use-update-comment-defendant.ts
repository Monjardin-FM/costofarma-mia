import { DefendantRepository } from "../../../domain/repositories/defendant-repository";
import { updateCommentDefendantService } from "../../../infraestructure/services/comment/update-comment.defendant";
import { useAsyncFn } from "react-use";

export const useUpdateCommentDefendant = () => {
  const [{ loading, error }, updateCommentDefendant] = useAsyncFn<
    DefendantRepository["postCommentDefendant"]
  >(updateCommentDefendantService, [updateCommentDefendantService]);
  return {
    updateCommentDefendant,
    loading,
    error,
  };
};
