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
      size="2xl"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Productos</ModalHeader>
            <ModalBody>
              {items.length > 0 && (
                <>
                  {items.map((item, index) => (
                    <Card>
                      <CardBody>
                        <div className="grid grid-cols-3 w-full ">
                          <div
                            key={index}
                            className="col-span-2 flex items-center justify-between"
                          >
                            <span className="font-semibold text-gray-800">
                              {item.descripcion} ({item.cantidad} pzas)
                            </span>
                            <Chip color="warning">
                              ${(item.precio * item.cantidad).toFixed(2)}
                            </Chip>
                          </div>
                          <div className="col-span-1 flex items-center justify-end">
                            <Button onClick={() => onTab(index)} isIconOnly>
                              <Icon.ChevronRight size={20} />
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
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
