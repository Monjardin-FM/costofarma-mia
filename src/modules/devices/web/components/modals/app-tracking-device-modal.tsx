import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
} from "@nextui-org/react";
import * as Icon from "react-feather";
import { Device } from "../../../domain/entities/device";
import { MapTrackingDevice } from "../maps/map-tracking-device";
import { useEffect, useState } from "react";
import { useGetPositionDevice } from "../../hooks/use-get-position-device";
import { AppHistoricPositionDevice } from "./app-historic-position-device";

export type AppTrackingDeviceModalProps = {
  isVisible: boolean;
  onClose: () => void;
  deviceInfo?: Device | null;
};
export const AppTrackingDeviceModal = ({
  isVisible,
  onClose,
  deviceInfo,
}: AppTrackingDeviceModalProps) => {
  const { getPositionDevice, positionDevice } = useGetPositionDevice();
  const [position, setPosition] = useState<[number, number] | null>([0, 0]);

  // useEffect to
  useEffect(() => {
    if (positionDevice && positionDevice.length > 0) {
      setPosition([positionDevice[0].lat, positionDevice[0].lon]);
    } else {
      setPosition(null);
    }
  }, [positionDevice]);
  useEffect(() => {
    const fetchData = () => {
      if (deviceInfo) {
        if (deviceInfo.idDeviceType === 1) {
          getPositionDevice({ imei: deviceInfo.description });
        } else if (deviceInfo.idDeviceType === 3) {
          getPositionDevice({ imei: String(deviceInfo.idPerson) });
        }
      }
    };
    if (isVisible) {
      fetchData();
      const intervalId = setInterval(fetchData, 60000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isVisible]);
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
            <ModalHeader className="grid grid-cols-12">
              <span className="col-span-3">Tracking Info</span>
            </ModalHeader>
            <ModalBody>
              <Tabs
                aria-label="options"
                variant="bordered"
                fullWidth
                color="primary"
              >
                <Tab
                  key="livePosition"
                  title={
                    <div className="flex items-center space-x-2">
                      <Icon.MapPin size={18} />
                      <span>Live Position</span>
                    </div>
                  }
                >
                  <MapTrackingDevice
                    positionDevice={positionDevice}
                    position={position}
                  />
                </Tab>
                <Tab
                  key="historicPosition"
                  title={
                    <div className="flex items-center space-x-2">
                      <Icon.Clock size={18} />
                      <span>Historic Position</span>
                    </div>
                  }
                >
                  <AppHistoricPositionDevice deviceInfo={deviceInfo} />
                </Tab>
              </Tabs>
              <div className="flex flex-row items-end justify-end">
                <Button onPress={onClose}>Cancel</Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
