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
import { useEffect } from "react";
type AppCommentModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
};
export const AppCommentModal = ({
  isVisible,
  onClose,
  idDefendant,
}: AppCommentModalProps) => {
  const { commentDefendant, getCommentDefendant } = useGetCommentDefendant();
  useEffect(() => {
    if (idDefendant) {
      getCommentDefendant({ idPerson: idDefendant });
    }
  }, [idDefendant, isVisible]);
  return (
    <Modal size="md" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader>Note</ModalHeader>
          <ModalBody>
            <Textarea
              id="comment"
              value={commentDefendant?.comment}
              label="Comment"
              labelPlacement="outside"
              placeholder="Enter your comment"
              className="w-full"
              errorMessage={"Required"}
              isReadOnly
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="shadow" onPress={onClose}>
              Ok
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
