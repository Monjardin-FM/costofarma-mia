import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Card } from "../../../../../Card/Card";
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
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <Card cardNumber="411111111111" />
                </div>
                <div className="col-span-1 flex flex-col gap-3">
                  <Input label="Nombre del Titular" />
                  <Input label="Número de tarjeta" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                      <Input label="MM" />
                    </div>
                    <div className="col-span-1">
                      <Input label="YYYY" />
                    </div>
                    <div className="col-span-1">
                      <Input label="CVV" />
                    </div>
                  </div>
                </div>
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
