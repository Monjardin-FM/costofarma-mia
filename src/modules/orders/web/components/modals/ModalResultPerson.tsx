import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { PersonTable } from "../table/OrderPersonTable";
import { Person } from "../../../domain/entities/Person";
export type ModalResultPersonProps = {
  isVisible: boolean;
  onClose: () => void;
  items?: Person;
  setIdPerson: (id: number) => void;
  onSearchOrderPerson: () => void;
};
export const ModalResultPerson = ({
  isVisible,
  onClose,
  items,
  setIdPerson,
  onSearchOrderPerson,
}: ModalResultPersonProps) => {
  const onSelectHandler = (idPerson: number) => {
    setIdPerson(idPerson);
    onSearchOrderPerson();
    onClose();
  };
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="2xl"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Cliente</ModalHeader>
            <ModalBody>
              {items ? (
                <PersonTable
                  items={items ? [items] : []}
                  onSelectPerson={(record) => {
                    onSelectHandler(record.record.idPersona);
                  }}
                />
              ) : (
                <span></span>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onClose} className="" size="md">
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
