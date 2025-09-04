import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import * as Icon from "react-feather";
export type ModalSharePaymentOrderProps = {
  isVisible: boolean;
  onClose: () => void;
  idOrder?: number | null;
};
export const ModalSharePaymentOrder = ({
  isVisible,
  onClose,
  idOrder,
}: ModalSharePaymentOrderProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const phone = (formData.get("phone") as string).trim();

    const digitsOnly = phone.replace(/\D/g, "");

    if (digitsOnly.length !== 10) {
      alert("El número de teléfono debe tener exactamente 10 dígitos.");
      return;
    }

    const url = `${import.meta.env.VITE_REACT_APP}/orders/payorder/${idOrder}`;

    const message =
      "\u{1F48A} ¡Hola!\n" +
      "Aquí tienes tu link para completar tu pago:\n" +
      `\u{1F449} ${url}\n\n` +
      "\u{2705} Gracias por elegir a COSTOFARMA, ¡tu salud es lo más importante!";

    // EncodeURIComponent para que no se rompa en la URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=52${phone}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="lg"
      backdrop="blur"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit}>
              <ModalHeader>Compartir link de pago</ModalHeader>
              <ModalBody>
                <h2>
                  Ingresa el número de teléfono al cuál le vas a compartir el
                  link de pago
                </h2>
                <Input
                  name="phone"
                  isRequired
                  variant="faded"
                  label="Número de teléfono"
                  placeholder="10 dígitos"
                  startContent={<Icon.Smartphone size={15} />}
                  type="tel"
                  inputMode="numeric"
                  //   pattern="[0-9]"
                  maxLength={10}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ""); // elimina todo lo que no sea dígito
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={onClose}
                  className=""
                  size="md"
                  variant="ghost"
                >
                  Cancelar
                </Button>
                <Button
                  startContent={<Icon.Send size={18} />}
                  color="primary"
                  type="submit"
                >
                  Enviar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
