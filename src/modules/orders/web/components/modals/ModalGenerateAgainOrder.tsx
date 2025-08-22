import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { OrderDetail } from "../../../domain/entities/OrderDetail";
import { FormInfoClient } from "../../../../new-order/web/components/forms/FormInfoClient";
import { ShoppingCartPatientInfoValues } from "../../../../new-order/web/components/modals/ShoppingCartPatientInfo";
import React, { useEffect, useState } from "react";
import { useReloadOrder } from "../../hooks/use-reload-order";
import { AppToast } from "../../../../../presentation/Components/AppToast";

type ModalGenerateAgainOrderProps = {
  isVisible: boolean;
  onClose: () => void;
  items?: OrderDetail[];
  onReload: () => void;
  idPerson: number;
};
export const ModalGenerateAgainOrder = ({
  isVisible,
  onClose,
  items = [],
  onReload,
  idPerson,
}: ModalGenerateAgainOrderProps) => {
  const [itemsList, setItems] = useState<OrderDetail[]>(items);
  const { reloadOrder, loading, error } = useReloadOrder();
  const [patientFormValues, setPatientFormValues] =
    useState<ShoppingCartPatientInfoValues>({
      rfc: "",
      nombre: "",
      paterno: "",
      materno: "",
      Calle: "",
      Colonia: "",
      Municipio: 0,
      Estado: 0,
      CP: "",
      Referencia1: "",
      Referencia2: "",
      Telefono: "",
      Mail: "",
    });

  const onReloadHandle = async () => {
    await reloadOrder(
      {
        direccion: {
          Calle: patientFormValues.Calle,
          Colonia: patientFormValues.Colonia || "",
          Municipio: patientFormValues.Municipio.toString(),
          Estado: patientFormValues.Estado.toString(),
          CP: patientFormValues.CP,
          Referencia1: patientFormValues.Referencia1 || "",
          Referencia2: patientFormValues.Referencia2 || "",
          Telefono: patientFormValues.Telefono,
          Mail: patientFormValues.Mail,
        },
        productos: productos,
        receta: "",
      },
      idPerson
    );
    if (!error) {
      AppToast().fire({
        title: "Pedido generado correctamente",
        icon: "success",
      });
      setItems([]);
      onClose();
      onReload();
      setPatientFormValues({
        rfc: "",
        nombre: "",
        paterno: "",
        materno: "",
        Calle: "",
        Colonia: "",
        Municipio: 0,
        Estado: 0,
        CP: "",
        Referencia1: "",
        Referencia2: "",
        Telefono: "",
        Mail: "",
      });
    }
  };
  // 👉 manejar cambio en cantidad
  const handleCantidadChange = (index: number, newCantidad: number) => {
    const updated = [...itemsList];
    updated[index].cantidad = newCantidad;
    setItems(updated);
  };

  // 👉 generar el arreglo productos con solo idProducto y cantidad
  const productos = itemsList.map((item) => ({
    idProducto: item.idProducto.toString(),
    cantidad: item.cantidad.toString(),
  }));
  const total = itemsList.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        text: "No se pudo generar el pedido.",
        icon: "error",
      });
      setPatientFormValues({
        rfc: "",
        nombre: "",
        paterno: "",
        materno: "",
        Calle: "",
        Colonia: "",
        Municipio: 0,
        Estado: 0,
        CP: "",
        Referencia1: "",
        Referencia2: "",
        Telefono: "",
        Mail: "",
      });
      onClose();
    }
  }, [error]);
  useEffect(() => {
    setItems(items);
  }, [items]);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="full"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Generar pedido</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-12 w-full gap-3">
                <Card className="bg-warn-50 col-span-6">
                  <CardBody className="flex flex-col items-start justify-start gap-3 ">
                    {itemsList.length > 0 &&
                      itemsList.map((item, index) => (
                        <React.Fragment key={item.idProducto}>
                          <div className="grid grid-cols-12 w-full">
                            <div className="col-span-12  grid grid-cols-12">
                              <span className="font-semibold text-gray-800 col-span-7">
                                {item.descripcion}
                              </span>
                              <div className="col-span-5 flex items-center justify-between gap-2">
                                <div>
                                  <Input
                                    type="number"
                                    min={1}
                                    value={item.cantidad.toString()}
                                    onChange={(e) =>
                                      handleCantidadChange(
                                        index,
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-24 text-right"
                                    endContent="pzas."
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span>{`x $${item.precio.toFixed(
                                    2
                                  )} = `}</span>
                                  <Chip color="warning" variant="shadow">
                                    ${(item.precio * item.cantidad).toFixed(2)}
                                  </Chip>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Divider />
                        </React.Fragment>
                      ))}
                  </CardBody>

                  {/* total */}
                  <div className="flex items-center justify-end p-3">
                    <Chip color="warning">
                      <span className="font-semibold">
                        Total: ${total.toFixed(2)}
                      </span>
                    </Chip>
                  </div>

                  {/* solo para ver el resultado de productos */}
                  {/* <div className="p-3 text-sm">
                    <pre>{JSON.stringify(productos, null, 2)}</pre>
                  </div> */}
                </Card>
                <Card className="col-span-6 p-3">
                  <FormInfoClient
                    mode="regenerate"
                    patientFormValues={patientFormValues}
                    setPatientFormValues={setPatientFormValues}
                  />
                </Card>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={onClose}
                size="md"
                variant="bordered"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  onReloadHandle();
                }}
                className=""
                size="md"
                variant="shadow"
                isLoading={loading}
                isDisabled={
                  loading ||
                  (!patientFormValues.rfc &&
                    !patientFormValues.nombre &&
                    !patientFormValues.paterno &&
                    !patientFormValues.Calle &&
                    patientFormValues.Municipio === 0 &&
                    patientFormValues.Estado === 0 &&
                    !patientFormValues.CP &&
                    !patientFormValues.Telefono &&
                    !patientFormValues.Mail)
                }
              >
                Generar Pedido
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
