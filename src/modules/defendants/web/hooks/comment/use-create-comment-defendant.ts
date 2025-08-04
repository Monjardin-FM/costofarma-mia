import { createCommentDefendantService } from "./../../../infraestructure/services/comment/create-comment-defendant";
import { useAsyncFn } from "react-use";
import { DefendantRepository } from "../../../domain/repositories/defendant-repository";

export const useCreateCommentDefendant = () => {
  const [{ loading, error }, createCommentDefendant] = useAsyncFn<
    DefendantRepository["postCommentDefendant"]
  >(createCommentDefendantService, [createCommentDefendantService]);
  return {
    createCommentDefendant,
    loading,
    error,
  };
};
