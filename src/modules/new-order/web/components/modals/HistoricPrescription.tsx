import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import * as Icon from "react-feather";
type HistoricPrescriptionProps = {
  isVisible?: boolean;
  onClose?: () => void;
  onSelectPrescription?: (prescription: { id: number; name: string }) => void;
};
export const HistoricPrescription = ({
  isVisible,
  onClose,
  onSelectPrescription,
}: HistoricPrescriptionProps) => {
  const mockPrescriptions = [
    { id: 1, name: "Receta del 05/11/2025 - Dr. Ramírez" },
    { id: 2, name: "Receta del 20/10/2025 - Dra. López" },
    { id: 3, name: "Receta del 01/09/2025 - Dr. García" },
  ];
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
            <ModalHeader>Histórico de Recetas</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-3">
                {mockPrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <span>{prescription.name}</span>
                    <Button
                      color="success"
                      size="sm"
                      onPress={() => {
                        if (onSelectPrescription) {
                          onSelectPrescription(prescription);
                        }
                        onClose();
                      }}
                      isIconOnly
                    >
                      <Icon.CheckCircle color="#fff" />
                    </Button>
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose} className="" size="md">
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
