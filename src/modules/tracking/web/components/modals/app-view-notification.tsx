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
import { NotificationTracking } from "../../../domain/entities/notification";
import * as Icon from "react-feather";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Importa el plugin UTC de Day.js
import timezone from "dayjs/plugin/timezone"; // Importa el plugin de zona horaria de Day.js
import { useCheckNotification } from "../../hooks/use-check-notification";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { useEffect } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);
export type AppViewNotificationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  notification?: NotificationTracking | null;
  onReload: () => void;
};
export const AppViewNotificationModal = ({
  isVisible,
  onClose,
  notification,
  onReload,
}: AppViewNotificationModalProps) => {
  const { checkNotification, error, loading } = useCheckNotification();
  const handleSubmit = async () => {
    if (notification) {
      await checkNotification({ idNotification: notification.idNotification });
    }
    if (!error) {
      AppToast().fire({
        title: "Check Notification",
        icon: "success",
        text: `Notification checked successfully  `,
      });
      onClose();
      onReload();
    }
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: `The notification has not been checked. Try again `,
      });
    }
    if (loading) {
      AppToast().fire({
        title: "Checking notification",
        icon: "info",
        text: `The notification is being checked `,
      });
    }
  }, [error, loading]);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="lg"
      backdrop="blur"
      scrollBehavior="inside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="grid grid-cols-12">
              <span className="col-span-12">Notification Information</span>
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex flex-col items-start justify-evenly mb-2 gap-3">
                <Chip color="primary" variant="shadow">
                  Defendant:
                  <b>{` ${notification?.defendant} `}</b>{" "}
                </Chip>

                <Chip color="warning" variant="shadow">
                  Officer:
                  <b>{notification?.officer}</b>
                </Chip>
                <Chip color="primary" variant="dot">{`Date: ${dayjs
                  .utc(notification?.fecAlta)
                  .local()
                  .format("MMMM/DD/YYYY HH:mm:ss A")}`}</Chip>

                <Textarea
                  value={notification?.message}
                  isReadOnly
                  label="Description"
                  variant="bordered"
                  labelPlacement="outside"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Close</Button>
              <Button
                startContent={<Icon.CheckCircle size={18} />}
                color="primary"
                onPress={handleSubmit}
                isDisabled={loading}
                isLoading={loading}
              >
                Check
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
