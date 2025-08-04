import { useEffect, useState } from "react";
import { useGetDetailTracking } from "../../hooks/use-get-detail-tracking";
import { AppTrackingDetailsTable } from "../tables/app-tracking-detail-table";
import { MapTracking } from "../maps/map-tracking";
import { Person, PersonAlert } from "../../../domain/entities/tracking-detail";

import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import * as Icon from "react-feather";
import { AppHistoricPositionTab } from "./app-historic-position-tab";
import { useShowAlerts } from "../../../../tracking-plus/web/hooks/use-show-alerts";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { GeoJSONO } from "../../../../defendants/domain/entities/geoJSON";
import { AppAddNotification } from "./app-add-notification";
import { useToggle } from "react-use";
import { AppCommentModal } from "../../../../defendants/web/components/modals/app-comment-modal";
import { AppCommunicationModal } from "./app-communication";
export type AppTrackingModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
};
export const AppTrackingModal = ({
  isVisible,
  onClose,
  onReload,
}: AppTrackingModalProps) => {
  const {
    trackingDetail,
    getTrackingDetail,
    loading: loadingTracking,
  } = useGetDetailTracking();
  const [alertPerson, setAlertPerson] = useState<PersonAlert[] | null>();
  const [userId, setUserId] = useState<number | null>();
  const [defendantInfo, setDefendantInfo] = useState<Person | null>();
  const [visibleAddNotificationModal, setVisibleAddNotificationModal] =
    useToggle(false);
  const [visibleCommentModal, setVisibleCommentModal] = useToggle(false);
  const [visibleCommunicationModal, setVisibleCommunicationModal] =
    useToggle(false);
  const {
    showAlerts,
    loading: loadingShowAlerts,
    error: errorShowAlert,
  } = useShowAlerts();
  const [positionDefendant, setPositionDefendant] = useState<
    [number, number] | null
  >([0, 0]);
  const [markerAlarmMap, setMarkerAlarmMap] = useState<PersonAlert | null>();
  const [isPositionDefendant, setIspositionDefendant] = useState(false);
  const [defendantItem, setDefendantItem] = useState<Person | null>();
  const [victims, setVictims] = useState<Person[] | null>();
  const [geofences, setGeofences] = useState<
    {
      idGeofence: number;
      geofence: GeoJSONO;
      idAlarmType: number;
      name: string;
    }[]
  >();
  useEffect(() => {
    if (trackingDetail) {
      const defendantPos = trackingDetail.person.find(
        (person) => person.idPersonType === 2
      );
      if (defendantPos && defendantPos.personPosition) {
        const geofencesList = defendantPos?.personPosition.geofences;
        const geofencesJSON = geofencesList?.map((geo) => ({
          idGeofence: geo.idGeofence,
          geofence: JSON.parse(geo.geofence),
          idAlarmType: geo.idAlarmType,
          name: geo.name,
        }));

        setGeofences(geofencesJSON);
      }
      const victimsDefendant = trackingDetail.person.filter(
        (person) => person.idPersonType === 3
      );
      if (defendantPos && defendantPos.personPosition) {
        setDefendantItem(defendantPos);
        setPositionDefendant([
          defendantPos.personPosition.lat,
          defendantPos.personPosition.lon,
        ]);
        setIspositionDefendant(true);
      } else {
        setPositionDefendant(null);
        setIspositionDefendant(false);
      }
      if (victimsDefendant && victimsDefendant.length > 0) {
        setVictims(victimsDefendant);
      } else {
        setVictims(null);
      }
    }
  }, [trackingDetail]);

  const handleShowAlert = async (idPerson: number) => {
    await showAlerts({ idPerson: idPerson, showalerts: false });
    if (!errorShowAlert) {
      AppToast().fire({
        title: "Success",
        icon: "success",
        text: "Action completed",
      });
    }
  };

  useEffect(() => {
    if (errorShowAlert) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: "An error has occurred",
      });
    }
  }, [errorShowAlert]);

  const handleClose = () => {
    setUserId(null);
    setAlertPerson([]);
    setDefendantInfo(null);
    setPositionDefendant(null);
    setVictims(null);
    setDefendantItem(null);
    setMarkerAlarmMap(null);
    onClose();
    // setIspositionDefendant(false);
  };

  // get the idDefendant
  useEffect(() => {
    if (isVisible) {
      const storedUserId = localStorage.getItem("trackingId");
      if (storedUserId) {
        setUserId(Number(storedUserId)); // Parseamos el valor a número
      }
    }
  }, [isVisible]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("trackingId");
    const fetchData = () => {
      if (storedUserId) {
        getTrackingDetail({ personId: Number(storedUserId) });
      }
    };
    if (isVisible) {
      fetchData();
      const intervalId = setInterval(fetchData, 30000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isVisible]);

  // Function to assign the defendant alerts and pass to the table to display
  useEffect(() => {
    if (trackingDetail) {
      setAlertPerson(trackingDetail.personAlert);
      setDefendantInfo(
        trackingDetail?.person.find((item) => item.idPersonType === 2)
      );
    }
  }, [trackingDetail, userId]);

  return (
    <Modal
      isOpen={isVisible}
      onClose={handleClose}
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
              <div className="w-full flex flex-row items-center justify-evenly mb-2">
                <Chip color="success" variant="shadow">
                  Defendant Name:{" "}
                  <b>{`${defendantInfo?.name} ${defendantInfo?.lastName} `}</b>{" "}
                </Chip>
                <Chip color="primary" variant="dot">
                  Phone: <b>{defendantInfo?.phone}</b>
                </Chip>
                <Chip color="success" variant="dot">
                  Officer:
                  <b>{defendantInfo?.officer}</b>
                </Chip>
                <Tooltip
                  content={"Add Notification"}
                  color="primary"
                  offset={1}
                  showArrow
                  closeDelay={10}
                  disableAnimation
                >
                  <Button
                    isIconOnly
                    color="primary"
                    size="sm"
                    onPress={() => setVisibleAddNotificationModal(true)}
                  >
                    <Icon.PlusCircle size={20} />
                  </Button>
                </Tooltip>

                <AppAddNotification
                  isVisible={visibleAddNotificationModal}
                  onClose={() => {
                    setVisibleAddNotificationModal(false);
                    onReload();
                  }}
                  defendantInfo={defendantInfo}
                  userId={userId}
                />
                <Tooltip
                  content={"Comment"}
                  color="warning"
                  offset={1}
                  showArrow
                  closeDelay={10}
                  disableAnimation
                >
                  <Button
                    isIconOnly
                    color="warning"
                    size="sm"
                    onPress={() => setVisibleCommentModal(true)}
                  >
                    <Icon.Info size={20} />
                  </Button>
                </Tooltip>
                <AppCommentModal
                  isVisible={visibleCommentModal}
                  onClose={() => setVisibleCommentModal(false)}
                  idDefendant={userId}
                />
                <Tooltip
                  content={"Communication"}
                  color="success"
                  offset={1}
                  showArrow
                  closeDelay={10}
                  disableAnimation
                >
                  <Button
                    isIconOnly
                    color="success"
                    size="sm"
                    onPress={() => setVisibleCommunicationModal(true)}
                  >
                    <Icon.MessageCircle size={20} />
                  </Button>
                </Tooltip>
                <AppCommunicationModal
                  isVisible={visibleCommunicationModal}
                  onClose={setVisibleCommunicationModal}
                  idDefendant={userId}
                />
              </div>
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
                  <div>
                    <div className="w-full  rounded-lg bg-gray-200 mb-5">
                      <MapTracking
                        loadingTracking={loadingTracking}
                        isPositionDefendant={isPositionDefendant}
                        defendantItem={defendantItem}
                        positionDefendant={positionDefendant}
                        victims={victims}
                        geofences={geofences}
                        onClose={onClose}
                        markerAlarmMap={markerAlarmMap}
                        alertPerson={alertPerson}
                      />
                    </div>

                    <div className="w-full mt-5 h-96 overflow-y-auto">
                      <AppTrackingDetailsTable
                        onShowAlerts={() => {
                          if (defendantInfo)
                            handleShowAlert(defendantInfo?.idPerson);
                        }}
                        onMapShow={(record) => {
                          setMarkerAlarmMap(record.record);
                        }}
                        items={alertPerson}
                        loadingShowAlerts={loadingShowAlerts}
                      />
                    </div>
                  </div>
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
                  <AppHistoricPositionTab />
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
