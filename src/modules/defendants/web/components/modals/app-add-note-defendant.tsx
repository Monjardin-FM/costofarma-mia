import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useCreateCommentDefendant } from "../../hooks/comment/use-create-comment-defendant";
import { FormEvent, useEffect, useState } from "react";
import * as Icon from "react-feather";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { TFunction } from "i18next";
type AppAddNoteDefendantModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
  translation: TFunction<[string], undefined>;
};

export const AppAddNoteDefendantModal = ({
  isVisible,
  onClose,
  idDefendant,
  translation,
}: AppAddNoteDefendantModalProps) => {
  const [comment, setComment] = useState<string>("");
  const { createCommentDefendant, loading, error } =
    useCreateCommentDefendant();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (idDefendant) {
      event.preventDefault();
      await createCommentDefendant({
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
  return (
    <Modal size="md" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader>{translation("ModalHeaderAddNote")}</ModalHeader>
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
