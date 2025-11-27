import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { FormInfoClient } from "../forms/FormInfoClient";
import { useEffect } from "react";
import { usegetPersonById } from "../../../../orders/web/hooks/use-get-person-by-id";
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
  afectado?: string;
  parentesco?: string;
  mailafectado: string;
  idAseguradora: number;
  idBroker: number;
  poliza: string;
  receta: string;
  informeMedico: string;
  recetaExt: string;
  informeMedicoExt: string;
};
export type ShoppingCartAddressProps = {
  isVisible?: boolean;
  onClose?: () => void;
  patientFormValues: ShoppingCartPatientInfoValues;
  setPatientFormValues: (values: ShoppingCartPatientInfoValues) => void;
  onEdit?: () => void;
  idPersona: number | null;
};
export const ShoppingCartPatientInfo = ({
  isVisible,
  onClose,
  setPatientFormValues,
  patientFormValues,
  onEdit = () => {},
  idPersona,
}: ShoppingCartAddressProps) => {
  const { getPersonById, personById } = usegetPersonById();

  useEffect(() => {
    if (idPersona) {
      getPersonById({ idPersona });
    }
  }, [idPersona]);
  useEffect(() => {
    if (personById) {
      setPatientFormValues({
        ...patientFormValues,
        idAseguradora: personById.asegurado.idAseguradora,
        idBroker: personById.asegurado.broker,
        poliza: personById.asegurado.poliza,
      });
    }
  }, [personById]);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="5xl"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Información del Asegurado</ModalHeader>
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
