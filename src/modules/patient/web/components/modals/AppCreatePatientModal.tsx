import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { AppFormField } from "../../../../../presentation/Components/AppForm";
import AppSelect from "../../../../../presentation/Components/AppSelect";
type AppCreatePatientModalProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const AppCreatePatientModal = ({
  isVisible,
  onClose,
}: AppCreatePatientModalProps) => {
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="3xl"
      backdrop="opaque"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Alta de Paciente</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-12 gap-4">
                <Input className="col-span-4" label="Teléfono" />
                <Input className="col-span-4" label="Correo electrónico" />
                <Input className="col-span-4" label="Poliza" />
                <AppFormField className="col-span-4">
                  <AppSelect
                    name="Aseguradora"
                    // value={values.Estado}
                    // onChange={handleChange}
                    required
                    // disabled={mode === "view"}
                  >
                    <option value="">Selecciona una aseguradora</option>
                    <option value="1">Aseguradora 1</option>
                    <option value="2">Aseguradora 2</option>
                    <option value="3">Aseguradora 3</option>
                  </AppSelect>
                </AppFormField>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={onClose}
                className=""
                size="md"
                variant="bordered"
              >
                Cerrar
              </Button>
              <Button color="primary" onClick={onClose}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
