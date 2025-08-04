import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { Person } from "../../../domain/entities/tracking-detail";
import { usePostNotification } from "../../hooks/use-post-notification";
import { AppFormField } from "../../../../../presentation/Components/AppForm";
import { useEffect, useState } from "react";
import { AppToast } from "../../../../../presentation/Components/AppToast";

export type AppAddNotificationProps = {
  isVisible: boolean;
  onClose: () => void;
  defendantInfo?: Person | null;
  userId?: number | null;
};

export const AppAddNotification = ({
  isVisible,
  onClose,
  defendantInfo,
  userId,
}: AppAddNotificationProps) => {
  const [message, setMessage] = useState<string>("");
  const { sendNotification, error, loading } = usePostNotification();
  const handleSubmit = async () => {
    if (userId) {
      await sendNotification({ idDefendant: userId, message: message });
    }
    if (!error) {
      AppToast().fire({
        title: "Sent Message",
        icon: "success",
        text: `The notification has been sent `,
      });
      onClose();
    }
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: `The notification has not been sent. Try again `,
      });
    }
    if (loading) {
      AppToast().fire({
        title: "Sending message",
        icon: "info",
        text: `The notification is being sent `,
      });
    }
  }, [error, loading]);
  useEffect(() => {
    return () => {
      setMessage("");
    };
  }, []);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="3xl"
      backdrop="blur"
      scrollBehavior="inside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="grid grid-cols-12">
              <span className="col-span-12">Add Notification</span>
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex flex-row items-center justify-evenly mb-2">
                <Chip color="success" variant="shadow">
                  Defendant Name:{" "}
                  <b>{`${defendantInfo?.name} ${defendantInfo?.lastName} `}</b>{" "}
                </Chip>
                <Chip color="success" variant="dot">
                  Officer:
                  <b>{defendantInfo?.officer}</b>
                </Chip>
              </div>
              <AppFormField className="w-full">
                <Textarea
                  name="message"
                  label="Description"
                  labelPlacement="outside"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="string"
                  placeholder="Add description"
                  radius="sm"
                  variant="faded"
                  size="md"
                />
              </AppFormField>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Cancel</Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isDisabled={loading}
                isLoading={loading}
              >
                Send Notification
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
