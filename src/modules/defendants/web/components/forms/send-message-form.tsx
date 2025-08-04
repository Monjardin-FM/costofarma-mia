import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { Phone } from "../../../domain/entities/phone";
import { useEffect, useState } from "react";
import { AppFormField } from "../../../../../presentation/Components/AppForm";
import { useSendMessage } from "../../hooks/use-send-message";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { TFunction } from "i18next";

export type SendMessageFormProps = {
  onClose: () => void;
  isVisible: boolean;
  selectedPhone?: Phone | null;
  translation: TFunction<[string], undefined>;
};
export const SendMessageForm = ({
  onClose,
  isVisible,
  selectedPhone,
  translation,
}: SendMessageFormProps) => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage, loading, error } = useSendMessage();
  const handleSubmit = async () => {
    if (selectedPhone) {
      await sendMessage({ mensaje: message, number: selectedPhone.phone });
    }
    if (!error) {
      AppToast().fire({
        title: translation("ToastSentMessageTitle"),
        icon: "success",
        text: translation("ToastSentMessageText", {
          message: selectedPhone?.phone,
        }),
      });
      onClose();
    }
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastSentMessageErrorText", {
          message: selectedPhone?.phone,
        }),
      });
    }
    if (loading) {
      AppToast().fire({
        title: translation("ToastLoadingSendMessageTitle"),
        icon: "info",
        text: translation("ToastLoadingSendMessageText", {
          message: selectedPhone?.phone,
        }),
      });
    }
  }, [error, loading]);
  useEffect(() => {
    return () => {
      setMessage("");
    };
  }, []);
  return (
    <Modal size="md" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 items-center"></ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center w-full p-5 gap-5">
            <div className="text-primaryColor-800">
              {translation("ModalSentMessageTitle")}
              <span className="font-semibold">{selectedPhone?.phone}</span>
            </div>
            <AppFormField className="w-full">
              <Textarea
                name="message"
                label={translation("LabelMessage")}
                labelPlacement="outside"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="string"
                placeholder={translation("PlacelHolderMessage")}
                radius="sm"
                variant="faded"
                size="md"
              />
            </AppFormField>
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>{translation("ButtonCancel")}</Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isDisabled={loading}
              isLoading={loading}
            >
              {translation("ButtonSentMessage")}
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
