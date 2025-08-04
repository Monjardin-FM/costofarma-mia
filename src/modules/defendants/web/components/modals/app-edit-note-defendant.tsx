import { FormEvent, useEffect, useState } from "react";
import { useUpdateCommentDefendant } from "../../hooks/comment/use-update-comment-defendant";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useGetCommentDefendant } from "../../hooks/comment/use-get-comment-defendant";
import * as Icon from "react-feather";
import { TFunction } from "i18next";
type AppEditNoteDefendantModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
  translation: TFunction<[string], undefined>;
};

export const AppEditNoteDefendantModal = ({
  isVisible,
  onClose,
  idDefendant,
  translation,
}: AppEditNoteDefendantModalProps) => {
  const [comment, setComment] = useState<string>("");
  const { updateCommentDefendant, loading, error } =
    useUpdateCommentDefendant();
  const { commentDefendant, getCommentDefendant } = useGetCommentDefendant();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (idDefendant) {
      event.preventDefault();
      await updateCommentDefendant({
        idDefendant: idDefendant,
        comment: comment,
      });
    }
    if (!error) {
      AppToast().fire({
        title: translation("ToastNoteSaveTitle"),
        icon: "success",
        text: translation("ToastNoteSaveText"),
      });
      onClose();
    }
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorSaveNoteText"),
      });
    }
    if (loading) {
      AppToast().fire({
        title: translation("ToastLoadingNoteSaveTitle"),
        icon: "info",
        text: translation("ToastLoadingNoteSaveText"),
      });
    }
  }, [error, loading]);
  useEffect(() => {
    if (idDefendant) {
      getCommentDefendant({ idPerson: idDefendant });
    }
  }, [idDefendant]);
  useEffect(() => {
    if (commentDefendant) {
      setComment(commentDefendant.comment);
    }
    return () => {
      setComment("");
    };
  }, [commentDefendant]);
  return (
    <Modal size="md" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader>{translation("ModalHeaderEditNote")}</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Textarea
                id="comment"
                value={comment}
                isRequired
                label={translation("LabelComment")}
                labelPlacement="outside"
                placeholder={translation("PlaceHolderComment")}
                className="w-full"
                errorMessage={"Required"}
                onValueChange={setComment}
              />
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} variant="light">
                {translation("ButtonCancel")}
              </Button>
              <Button
                type="submit"
                color="primary"
                startContent={<Icon.Save size={15} />}
                isDisabled={loading}
                isLoading={loading}
              >
                {translation("ButtonSave")}
              </Button>
            </ModalFooter>
          </form>
        </>
      </ModalContent>
    </Modal>
  );
};
