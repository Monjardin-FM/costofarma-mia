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
import { ShoppingCart } from "../../../domain/entities/shopping-cart";
import { ShoppingCartPatientInfoValues } from "./ShoppingCartPatientInfo";
import { useCreateNewOrder } from "../../hooks/use-create-order";

import { AppToast } from "../../../../../presentation/Components/AppToast";
import { useNavigate } from "react-router-dom";
import { FormInfoClient } from "../forms/FormInfoClient";
export type ShoppingCartConfirmOrderProps = {
  isVisible: boolean;
  onClose: () => void;
  items?: ShoppingCart;
  patientInfo: ShoppingCartPatientInfoValues;
  onEdit?: () => void;
  onConfirm?: () => void;
};
export const ShoppingCartConfirmOrder = ({
  isVisible,
  onClose,
  items = [],
  patientInfo,
  onEdit = () => {},
  onConfirm = () => {},
}: ShoppingCartConfirmOrderProps) => {
  const { createNewOrder, error, loading } = useCreateNewOrder();
  const navigate = useNavigate();

  const onGenerate = async () => {
    await createNewOrder({
      persona: {
        nombre: patientInfo.nombre,
        paterno: patientInfo.paterno,
        materno: patientInfo.materno,
        rfc: patientInfo.Mail,
        telefono: patientInfo.Telefono,
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
            ean: item.ean,
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
      onConfirm();
      navigate("/orders");
    }
  };

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
            <ModalHeader>Resúmen de pedido</ModalHeader>
            <ModalBody>
              <>
                <FormInfoClient
                  patientFormValues={patientInfo}
                  setPatientFormValues={() => {}}
                  mode="view"
                  onEdit={onEdit}
                />
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
                isLoading={loading}
                isDisabled={loading}
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
