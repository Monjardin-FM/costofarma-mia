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
import { ShoppingCartPatientInfoValues } from "./ShoppingCartPatientInfo";
import * as Icon from "react-feather";
import { useCreateNewOrder } from "../../hooks/use-create-order";

import { AppToast } from "../../../../../presentation/Components/AppToast";
import { useNavigate } from "react-router-dom";
export type ShoppingCartConfirmOrderProps = {
  isVisible: boolean;
  onClose: () => void;
  items?: ShoppingCart;
  patientInfo: ShoppingCartPatientInfoValues;
};
export const ShoppingCartConfirmOrder = ({
  isVisible,
  onClose,
  items = [],
  patientInfo,
}: ShoppingCartConfirmOrderProps) => {
  const { createNewOrder, error } = useCreateNewOrder();
  const navigate = useNavigate();

  const onGenerate = async () => {
    await createNewOrder({
      persona: {
        nombre: patientInfo.nombre,
        paterno: patientInfo.paterno,
        materno: patientInfo.materno,
        rfc: patientInfo.rfc,
      },
      direccion: {
        Calle: patientInfo.Calle,
        Colonia: patientInfo.Colonia ?? "",
        Municipio: patientInfo.Municipio.toString(),
        Estado: patientInfo.Estado.toString(),
        CP: patientInfo.CP,
        Referencia1: patientInfo.Referencia1 ?? "",
        Referencia2: patientInfo.Referencia2 ?? "",
        Telefono: patientInfo.Telefono,
        Mail: patientInfo.Mail,
      },
      productos:
        items
          ?.filter((item) => item.idProducto !== undefined && item.cantidad > 0)
          .map((item) => ({
            idProducto: item.idProducto!.toString(),
            cantidad: item.cantidad.toString(),
          })) ?? [],
      receta: "",
    });
    if (!error) {
      AppToast().fire({
        title: "Pedido creado",
        icon: "success",
        text: "El pedido se generó correctamente",
      });
      onClose();
      navigate("/orders");
    }
  };

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
            <ModalHeader>Resumen de pedido</ModalHeader>
            <ModalBody>
              <>
                <div className="bg-white rounded-xl shadow p-6 space-y-4">
                  {/* Datos personales */}
                  <section>
                    <h2 className="text-lg font-bold border-b pb-1 mb-2">
                      Datos Personales
                    </h2>
                    <p>
                      <strong>RFC:</strong> {patientInfo.rfc}
                    </p>
                    <p>
                      <strong>Nombre:</strong> {patientInfo.nombre}{" "}
                      {patientInfo.paterno} {patientInfo.materno}
                    </p>
                  </section>

                  {/* Contacto */}
                  <section>
                    <h2 className="text-lg font-bold border-b pb-1 mb-2">
                      Contacto
                    </h2>
                    <p>
                      <strong>Teléfono:</strong> {patientInfo.Telefono}
                    </p>
                    <p>
                      <strong>Correo:</strong> {patientInfo.Mail}
                    </p>
                  </section>
                </div>
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
                            {/* <div className="col-span-1 flex items-center justify-end">
                            <Button onClick={() => onTab(index)} isIconOnly>
                              <Icon.ChevronRight size={20} />
                            </Button>
                          </div> */}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </>
                )}
              </>
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
                onClick={onGenerate}
                startContent={<Icon.Save />}
              >
                Generar pedido
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
