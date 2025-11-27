import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { DetailPayment } from "../DetailPayment";
import { ShoppingCart } from "../../../../new-order/domain/entities/shopping-cart";
export type ModalDetailPaymentProps = {
  isVisible: boolean;
  onClose: () => void;
  items?: ShoppingCart;
};
export const ModalDetailPayment = ({
  isVisible,
  onClose,
  items = [],
}: ModalDetailPaymentProps) => {
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="3xl"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Resúmen de pedido</ModalHeader>
            <ModalBody>
              <>
                <DetailPayment items={items} />
              </>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={onClose}
                className=""
                size="md"
                variant="shadow"
              >
                Ok
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
