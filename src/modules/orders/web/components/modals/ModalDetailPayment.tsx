import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Product } from "../../../../new-order/domain/entities/product";
export type ModalDetailPaymentProps = {
  isVisible: boolean;
  onClose: () => void;
  items?: Product[];
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
                <Card className="bg-warn-50">
                  <CardBody className="flex flex-col items-start justify-start gap-3 ">
                    {items.length > 0 && (
                      <>
                        {items.map((item, index) => (
                          <>
                            <div className="grid grid-cols-12 w-full ">
                              <div
                                key={index}
                                className="col-span-12 flex items-center justify-between"
                              >
                                <span className="font-semibold text-gray-800">
                                  {item.descripcion}
                                </span>
                                <div className="flex items-center gap-2">
                                  <span>
                                    {`${
                                      item.cantidad
                                    } pzas. x $${item.precio.toFixed(2)} = `}
                                  </span>
                                  <Chip color="warning" variant="shadow">
                                    ${(item.precio * item.cantidad).toFixed(2)}
                                  </Chip>
                                </div>
                              </div>
                            </div>
                            <Divider />
                          </>
                        ))}
                      </>
                    )}
                  </CardBody>
                  <div className="flex items-center justify-end p-3">
                    <Chip color="warning">
                      <span className="font-semibold">
                        Total: $
                        {items
                          .reduce(
                            (acc, item) => acc + item.precio * item.cantidad,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </Chip>
                  </div>
                </Card>
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
