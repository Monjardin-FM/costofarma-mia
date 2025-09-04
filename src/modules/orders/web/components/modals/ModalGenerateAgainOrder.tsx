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
  Tooltip,
} from "@nextui-org/react";
import { OrderDetail } from "../../../domain/entities/OrderDetail";
import { FormInfoClient } from "../../../../new-order/web/components/forms/FormInfoClient";
import {
  ShoppingCartPatientInfo,
  ShoppingCartPatientInfoValues,
} from "../../../../new-order/web/components/modals/ShoppingCartPatientInfo";
import React, { useEffect, useState } from "react";
import { useReloadOrder } from "../../hooks/use-reload-order";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { ModalAddProduct } from "./ModalAddProduct";
import { useToggle } from "react-use";
import * as Icon from "react-feather";
import { Product } from "../../../../new-order/domain/entities/product";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useGetOrderDetail } from "../../hooks/use-get-order-detail";
import { usegetPersonById } from "../../hooks/use-get-person-by-id";

type ModalGenerateAgainOrderProps = {
  isVisible: boolean;
  onClose: () => void;
  // items?: OrderDetail[];
  idOrder?: number;
  onReload: () => void;
  idPerson: number;
};
export const ModalGenerateAgainOrder = ({
  isVisible,
  onClose,
  // items = [],
  idOrder = 0,
  onReload,
  idPerson,
}: ModalGenerateAgainOrderProps) => {
  const [itemsList, setItems] = useState<OrderDetail[]>([]);
  const { reloadOrder, loading, error } = useReloadOrder();
  const [modalAddProduct, toggleModalAddProduct] = useToggle(false);
  const [animation] = useAutoAnimate();
  const { getOrderDetail, orderDetail } = useGetOrderDetail();
  const { getPersonById, personById } = usegetPersonById();

  const [onCustomerForm, toggleCustomerForm] = useToggle(false);

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
  const onAddHandler = (product: Product) => {
    if (
      itemsList &&
      itemsList.some((item) => item.idProducto === product.idProducto)
    ) {
      AppToast().fire({
        title: "Producto ya agregado",
        text: "Este producto ya lo agregaste a la lista",
        icon: "warning",
      });
      return;
    }

    setItems((prevItems) => [...prevItems, { ...product, cantidad: 1 }]);
    AppToast().fire({
      title: "Producto agregado",
      text: "Producto agregado a la lista",
      icon: "success",
    });
  };
  const onDeleteHandler = (index: number) => {
    const filteredItems = itemsList?.filter(
      (item) => item.idProducto !== index
    );
    setItems(filteredItems);
  };
  const onReloadHandler = async () => {
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
  const productos = itemsList?.map((item) => ({
    idProducto: item.idProducto.toString(),
    cantidad: item.cantidad.toString(),
  }));
  const total = itemsList?.reduce(
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
  const resetProducts = () => {
    getOrderDetail({ idOrder: idOrder });
  };
  useEffect(() => {
    if (idOrder) {
      getOrderDetail({ idOrder: idOrder });
    }
  }, [idOrder]);
  useEffect(() => {
    if (orderDetail) {
      setItems(orderDetail);
    }
  }, [orderDetail]);
  useEffect(() => {
    if (idPerson) {
      getPersonById({ idPersona: idPerson });
    }
  }, [idPerson]);
  useEffect(() => {
    if (personById) {
      setPatientFormValues({
        nombre: personById.nombre,
        paterno: personById.paterno,
        materno: personById.materno,
        rfc: personById.rfc,
        Calle: personById.direccion.calle,
        CP: personById.direccion.cp,
        Mail: personById.direccion.mail,
        Telefono: personById.direccion.telefono,
        Colonia: personById.direccion.colonia,
        Referencia1: personById.direccion.referencia1,
        Referencia2: personById.direccion.referencia2,
        Estado: personById.direccion.idEstado,
        Municipio: personById.direccion.idMunicipio,
      });
    }
  }, [personById]);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="5xl"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalAddProduct
        isVisible={modalAddProduct}
        onClose={() => toggleModalAddProduct(false)}
        onAdd={(product) => onAddHandler(product)}
      />
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Generar pedido</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-12 w-full gap-3">
                <div className="col-span-12 flex items-center justify-start gap-3">
                  <Tooltip
                    content="Agregar productos"
                    color="primary"
                    disableAnimation
                  >
                    <Button
                      isIconOnly
                      color="primary"
                      onClick={() => toggleModalAddProduct(true)}
                    >
                      {" "}
                      <Icon.PlusCircle size={18} />{" "}
                    </Button>
                  </Tooltip>
                  <Tooltip
                    content="Resetear productos"
                    color="foreground"
                    disableAnimation
                  >
                    <Button
                      isIconOnly
                      color="default"
                      onClick={() => resetProducts()}
                    >
                      <Icon.RefreshCw size={18} />
                    </Button>
                  </Tooltip>
                </div>

                <Card className="bg-warn-50 col-span-12">
                  <CardBody>
                    <div
                      className="flex flex-col items-start justify-start gap-3"
                      ref={animation}
                    >
                      {itemsList.length > 0 &&
                        itemsList.map((item, index) => (
                          <React.Fragment key={item.idProducto}>
                            <div className="grid grid-cols-12 w-full">
                              <div className="col-span-12  grid grid-cols-12">
                                <span className="col-span-6 font-semibold text-gray-800  text-sm flex items-center justify-start">
                                  {item.descripcion}
                                </span>
                                <div className="col-span-6 flex items-center justify-between gap-2">
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
                                      className="w-24 text-right text-xs"
                                      endContent="pzas."
                                    />
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <span>{`x $${item.precio.toFixed(
                                      2
                                    )} = `}</span>
                                    <Chip color="warning" variant="shadow">
                                      $
                                      {(item.precio * item.cantidad).toFixed(2)}
                                    </Chip>
                                    <Button
                                      isIconOnly
                                      variant="faded"
                                      color="danger"
                                      onClick={() => {
                                        onDeleteHandler(item.idProducto);
                                      }}
                                    >
                                      <Icon.Trash2 size={18} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Divider />
                          </React.Fragment>
                        ))}
                    </div>
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
                <Card className="col-span-12 p-3">
                  <ShoppingCartPatientInfo
                    isVisible={onCustomerForm}
                    onClose={() => toggleCustomerForm(false)}
                    patientFormValues={patientFormValues}
                    setPatientFormValues={setPatientFormValues}
                  />

                  <FormInfoClient
                    mode={"view"}
                    patientFormValues={patientFormValues}
                    setPatientFormValues={setPatientFormValues}
                    onEdit={() => {
                      toggleCustomerForm(true);
                      // setConfirmOrderModal(false);
                    }}
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
                  onReloadHandler();
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
