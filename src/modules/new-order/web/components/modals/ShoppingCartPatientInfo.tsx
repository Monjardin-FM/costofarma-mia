import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { FormInfoClient } from "../forms/FormInfoClient";
export type ShoppingCartPatientInfoValues = {
  rfc: string;
  nombre: string;
  paterno: string;
  materno: string;
  Calle: string;
  Colonia?: string;
  Municipio: number;
  Estado: number;
  CP: string;
  Referencia1?: string;
  Referencia2?: string;
  Telefono: string;
  Mail: string;
};
export type ShoppingCartAddressProps = {
  isVisible?: boolean;
  onClose?: () => void;
  patientFormValues: ShoppingCartPatientInfoValues;
  setPatientFormValues: (values: ShoppingCartPatientInfoValues) => void;
  onEdit?: () => void;
};
export const ShoppingCartPatientInfo = ({
  isVisible,
  onClose,
  setPatientFormValues,
  patientFormValues,
  onEdit = () => {},
}: ShoppingCartAddressProps) => {
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="4xl"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Información del Paciente</ModalHeader>
            <ModalBody>
              <FormInfoClient
                patientFormValues={patientFormValues}
                setPatientFormValues={setPatientFormValues}
                onClose={onClose}
                mode="edit"
                onEdit={onEdit}
              />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
