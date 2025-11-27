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
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { FormInfoClient } from "../../../../new-order/web/components/forms/FormInfoClient";
import {
  ShoppingCartPatientInfo,
  ShoppingCartPatientInfoValues,
} from "../../../../new-order/web/components/modals/ShoppingCartPatientInfo";
import React, { useEffect, useState } from "react";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { ModalAddProduct } from "./ModalAddProduct";
import { useToggle } from "react-use";
import * as Icon from "react-feather";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useGetOrderDetail } from "../../hooks/use-get-order-detail";
import { usegetPersonById } from "../../hooks/use-get-person-by-id";
import { Product } from "../../../../new-order/domain/entities/product";
import { StepperFormPayment } from "../../../../Modals/StepperFormPayment";
import { useCreateNewOrder } from "../../../../new-order/web/hooks/use-create-order";
export type ProductWithRecurrencia = Product & {
  recurrencia: string;
};
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
  const [itemsList, setItems] = useState<ProductWithRecurrencia[]>([]);
  // const { reloadOrder, loading, error } = useReloadOrder();
  const { createNewOrder, loading, error } = useCreateNewOrder();
  const [modalPayment, setModalPayment] = useToggle(false);
  const [modalAddProduct, toggleModalAddProduct] = useToggle(false);
  const [animation] = useAutoAnimate();
  const { getOrderDetail, orderDetail } = useGetOrderDetail();
  const { getPersonById, personById } = usegetPersonById();
  const [onCustomerForm, toggleCustomerForm] = useToggle(false);
  const [onPaymentComplete, setOnPaymentComplete] = useState<
    (() => void) | null
  >(null);
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
      idAseguradora: 0,
      idBroker: 0,
      informeMedico: "",
      informeMedicoExt: "",
      mailafectado: "",
      poliza: "",
      receta: "",
      recetaExt: "",
      afectado: "",
      parentesco: "",
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

    setItems((prevItems) => [
      ...prevItems,
      { ...product, cantidad: 1, recurrencia: "" },
    ]);
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
  // Funcion para recargar el pedido
  const onPay = () => {
    return new Promise<boolean>((resolve) => {
      const handlePaymentDone = () => {
        resolve(true);
        setModalPayment(false);
      };
      setOnPaymentComplete(() => handlePaymentDone);
      setModalPayment(true);
    });
  };
  const onReloadHandler = async () => {
    const responsePay = await onPay(); // Espera hasta que el pago termine
    if (responsePay) {
      await createNewOrder({
        persona: {
          nombre: patientFormValues.nombre,
          paterno: patientFormValues.paterno,
          materno: patientFormValues.materno,
          rfc: patientFormValues.rfc,
          telefono: patientFormValues.Telefono,
          mailafectado: patientFormValues.Mail,
          afectado: patientFormValues.afectado,
          parentesco: patientFormValues.parentesco,
        },
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
        documentos: {
          receta: patientFormValues.receta,
          informeMedico: patientFormValues.informeMedico,
          recetaExt: patientFormValues.recetaExt,
          informeMedicoExt: patientFormValues.informeMedicoExt,
        },
        aseguradora: {
          idAseguradora: Number(patientFormValues.idAseguradora),
          idBroker: Number(patientFormValues.idBroker),
          poliza: patientFormValues.poliza,
        },
        productos:
          productos
            ?.filter(
              (item) =>
                item.idProducto !== undefined && Number(item.cantidad) > 0
            )
            .map((item) => ({
              idProducto: item.idProducto!.toString(),
              cantidad: item.cantidad.toString(),
              ean: item.ean,
              recurrencia: item.recurrencia,
            })) ?? [],
      });
    }
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
        idAseguradora: 0,
        idBroker: 0,
        informeMedico: "",
        informeMedicoExt: "",
        mailafectado: "",
        poliza: "",
        receta: "",
        recetaExt: "",
        afectado: "",
        parentesco: "",
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
    ean: item.ean,
    recurrencia: item.recurrencia,
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
        idAseguradora: 0,
        idBroker: 0,
        informeMedico: "",
        informeMedicoExt: "",
        mailafectado: "",
        poliza: "",
        receta: "",
        recetaExt: "",
        afectado: "",
        parentesco: "",
      });
      onClose();
    }
  }, [error]);
  const resetProducts = () => {
    getOrderDetail({ idOrder: idOrder });
  };
  const handleRecurrenciaChange = (index: number, value: string) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, recurrencia: value } : item
      )
    );
  };
  useEffect(() => {
    if (idOrder) {
      getOrderDetail({ idOrder: idOrder });
    }
  }, [idOrder]);
  useEffect(() => {
    if (orderDetail) {
      const productosConRecurrencia = orderDetail.productos.map((p) => ({
        ...p,
        recurrencia: p.recurrencia ?? "", // o el valor por defecto que quieras
      }));

      setItems(productosConRecurrencia);
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
        idAseguradora: personById.asegurado.idAseguradora,
        idBroker: personById.asegurado.broker,
        informeMedico: "",
        informeMedicoExt: "",
        mailafectado: personById.mail,
        poliza: personById.asegurado.poliza,
        receta: "",
        recetaExt: "",
        afectado: "",
        parentesco: "",
      });
    }
  }, [personById]);
  const isFormInvalid = () => {
    const f = patientFormValues;

    const requiredFields = [
      f.rfc,
      f.nombre,
      f.paterno,
      f.Calle,
      f.CP,
      f.Telefono,
      f.Mail,
      f.poliza,
      f.receta,
    ];

    const anyEmpty = requiredFields.some((value) => !value);

    const invalidSelects =
      f.Municipio === 0 || f.Estado === 0 || f.idAseguradora === 0;

    const invalidRecurrencia = itemsList.some((i) => !i.recurrencia);

    return anyEmpty || invalidSelects || invalidRecurrencia;
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
      <ModalAddProduct
        isVisible={modalAddProduct}
        onClose={() => toggleModalAddProduct(false)}
        onAdd={(product) => onAddHandler(product)}
      />
      <StepperFormPayment
        isVisible={modalPayment}
        onClose={() => {
          setModalPayment(false);
        }}
        onReload={() => onReload()}
        items={itemsList}
        onPay={onPaymentComplete || undefined}
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
                      onPress={() => toggleModalAddProduct(true)}
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
                      onPress={() => resetProducts()}
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
                                <span className="col-span-5 font-semibold text-gray-800  text-sm flex items-center justify-start">
                                  {item.descripcion}
                                </span>
                                <div className="col-span-7  items-center justify-between gap-2 grid grid-cols-12">
                                  {/* NUEVO: SELECT DE RECURRENCIA */}
                                  <div className="col-span-4 max-w-full">
                                    <Select
                                      label="Recurrencia"
                                      name="Recurrencia"
                                      size="sm"
                                      selectedKeys={[item.recurrencia]}
                                      onChange={(e) =>
                                        handleRecurrenciaChange(
                                          index,
                                          e.target.value
                                        )
                                      }
                                      className="w-full"
                                    >
                                      <SelectItem key="">
                                        Sin recurrencia
                                      </SelectItem>
                                      <SelectItem key="semanal">
                                        Semanal
                                      </SelectItem>
                                      <SelectItem key="quincenal">
                                        Quincenal
                                      </SelectItem>
                                      <SelectItem key="mensual">
                                        Mensual
                                      </SelectItem>
                                      <SelectItem key="bimestral">
                                        Bimestral
                                      </SelectItem>
                                      <SelectItem key="trimestral">
                                        Trimestral
                                      </SelectItem>
                                      <SelectItem key="semestral">
                                        Semestral
                                      </SelectItem>
                                    </Select>
                                  </div>
                                  <div className="col-span-3 flex items-center gap-2">
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
                                  <div className="col-span-5 flex items-center gap-2 text-sm">
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
                                      onPress={() => {
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
                    idPersona={idPerson}
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
                onPress={onClose}
                size="md"
                variant="bordered"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onReloadHandler();
                }}
                className=""
                size="md"
                variant="shadow"
                isLoading={loading}
                isDisabled={loading || isFormInvalid()}
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
