import {
  Button,
  Card,
  CardBody,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "@nextui-org/react";
import { ShoppingCart } from "../../../domain/entities/shopping-cart";
// import { Player } from "@lottiefiles/react-lottie-player";
import * as Icon from "react-feather";
export type ShoppingCartViewerProps = {
  items?: ShoppingCart;
  isVisible?: boolean;
  onClose?: () => void;
  onTab?: (index: number) => void;
};
export const ShoppingCartViewer = ({
  isVisible = false,
  items = [],
  onClose = () => {},
  onTab = () => {},
}: ShoppingCartViewerProps) => {
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
            <ModalHeader>Carrito de compra</ModalHeader>
            <ModalBody>
              {items.length > 0 && (
                <>
                  {items.map((item, index) => (
                    <Card>
                      <CardBody>
                        <div className="grid grid-cols-12 w-full ">
                          <div
                            key={index}
                            className="col-span-10 flex items-center justify-between"
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
                          <div className="col-span-2 flex items-center justify-end">
                            <Tooltip
                              content="Editar artículo"
                              disableAnimation
                              color="primary"
                              showArrow
                              closeDelay={10}
                            >
                              <Button onClick={() => onTab(index)} isIconOnly>
                                <Icon.ChevronRight size={20} />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                  <div className="items-center justify-end mt-4 grid grid-cols-12 w-full">
                    <div className="col-span-10 flex items-center justify-end">
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
                  </div>
                </>
              )}

              {items.length === 0 && (
                <div>
                  {/* <Player
                    autoplay
                    loop
                    src={DogSwimmingAnimation}
                    className="w-64 h-64"
                  /> */}
                  <div className="mt-6 text-center mx-auto max-w-sm">
                    <h2 className="text-xl font-medium text-gray-700">
                      Carrito de compra vacio
                    </h2>
                    <p className="text-gray-700">
                      Para generar una orden el carrito de compra debe disponer
                      al menos de un articulo
                    </p>
                  </div>
                </div>
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
