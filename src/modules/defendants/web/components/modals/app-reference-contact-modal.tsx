import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { ReferenceForm } from "../forms/reference-from";
import { useGetReferenceContactById } from "../../hooks/reference-contact/use-get-reference-contact-by-id";
import { useEffect, useState } from "react";
import { ReferenceContact } from "../../../domain/entities/reference-contact";
import { TFunction } from "i18next";

type AppReferenceContactModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
  idReferencePerson?: number | null;
  isCreating: boolean;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};

export const AppReferenceContactModal = ({
  isVisible,
  onClose,
  idDefendant,
  idReferencePerson,
  isCreating,
  onReload,
  translation,
}: AppReferenceContactModalProps) => {
  const [data, setData] = useState<ReferenceContact | null>();
  const { getReferenceContactById, referenceContactById } =
    useGetReferenceContactById();
  useEffect(() => {
    if (idReferencePerson && !isCreating) {
      getReferenceContactById({ referenceId: idReferencePerson });
    }
  }, [idDefendant, idReferencePerson]);
  useEffect(() => {
    if (isCreating) {
      setData(null);
    } else {
      setData(referenceContactById);
    }
  }, [referenceContactById, isCreating]);

  return (
    <Modal size="4xl" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 items-center">
            {translation("ModalReferenceContactTitle")}
          </ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center w-full p-5">
            <ReferenceForm
              isCreating={isCreating}
              idDefendant={idDefendant}
              onClose={onClose}
              idReferencePerson={idReferencePerson}
              onReload={onReload}
              referenceContact={data}
              translation={translation}
            />
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};
