import {
  Button,
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
import { DetailPayment } from "../../../../orders/web/components/DetailPayment";
export type ShoppingCartConfirmOrderProps = {
  isVisible: boolean;
  onClose: () => void;
  items?: ShoppingCart;
  patientInfo: ShoppingCartPatientInfoValues;
  onEdit?: () => void;
  onConfirm?: () => void;
  onPay: () => Promise<boolean>;
};
export const ShoppingCartConfirmOrder = ({
  isVisible,
  onClose,
  items = [],
  patientInfo,
  onEdit = () => {},
  onConfirm = () => {},
  onPay,
}: ShoppingCartConfirmOrderProps) => {
  const { createNewOrder, error, loading } = useCreateNewOrder();
  const navigate = useNavigate();
  const onGenerate = async () => {
    const responsePay = await onPay(); // Espera hasta que el pago termine
    if (responsePay) {
      await createNewOrder({
        persona: {
          nombre: patientInfo.nombre,
          paterno: patientInfo.paterno,
          materno: patientInfo.materno,
          rfc: patientInfo.rfc,
          telefono: patientInfo.Telefono,
          mailafectado: patientInfo.Mail,
          afectado: patientInfo.afectado,
          parentesco: patientInfo.parentesco,
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
        documentos: {
          receta: patientInfo.receta,
          informeMedico: patientInfo.informeMedico,
          recetaExt: patientInfo.recetaExt,
          informeMedicoExt: patientInfo.informeMedicoExt,
        },
        aseguradora: {
          idAseguradora: Number(patientInfo.idAseguradora),
          idBroker: Number(patientInfo.idBroker),
          poliza: patientInfo.poliza,
        },
        productos:
          items
            ?.filter(
              (item) => item.idProducto !== undefined && item.cantidad > 0
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
                  loading={loading}
                />
                <DetailPayment items={items} />
              </>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onPress={onClose}
                className=""
                size="md"
                variant="bordered"
              >
                Cancelar
              </Button>
              <Button
                color="primary"
                onPress={onGenerate}
                isLoading={loading}
                isDisabled={loading}
              >
                {loading ? "Generando..." : "Generar pedido"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
