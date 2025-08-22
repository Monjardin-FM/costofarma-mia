import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { StepperFormPayment } from "../../../../Modals/StepperFormPayment";
export type ModalPaymentProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const ModalPayment = ({ isVisible, onClose }: ModalPaymentProps) => {
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
            <ModalHeader>Pago</ModalHeader>
            <ModalBody>
              <StepperFormPayment
                isVisible={isVisible}
                onClose={onClose}
                onReload={() => {}}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={onClose}
                className=""
                size="md"
                variant="bordered"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onClick={() => {}}
                // startContent={<Icon.Save />}
              >
                Pagar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
