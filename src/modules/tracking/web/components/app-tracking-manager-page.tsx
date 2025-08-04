import { useEffect, useState } from "react";
import AppConfig from "../../../../settings.json";
import { AppTrackingHeader } from "./app-tracking-header";
import { AppTrackingsTable } from "./tables/app-tracking-table";
import { AppTrackingModal } from "./modals/app-tracking-modal";
import { useToggle } from "react-use";
import { useGetTracking } from "../hooks/use-get-tracking";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppLoading } from "../../../../presentation/Components/AppLoading";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
// import { Button } from "@nextui-org/react";
// import * as Icon from "react-feather";
import { AppTrackingNotificationCenter } from "./app-tracking-notification-center";
import { useGetNotification } from "../hooks/use-get-notification";
import { NotificationTracking } from "../../domain/entities/notification";
import { AppViewNotificationModal } from "./modals/app-view-notification";
import { useTranslation } from "react-i18next";
export const AppTrackingManagerPage = () => {
  const { t: translation } = useTranslation("Tracking");
  const [visibleTrackingModal, setVisibleTrackingModal] = useToggle(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const { tracking, getTracking } = useGetTracking();
  // const [mute, setMute] = useState(false);
  // const [audio, setAudio] = useState(new Audio("/src/assets/mp3/alarm.mp3"));
  const [visibleNotificationCenter, setVisibleNotificationCenter] =
    useToggle(false);
  const [visibleNotificationDetailModal, setVisibleNotificationDetailModal] =
    useToggle(false);
  const [notificationSelected, setNotificationSelected] =
    useState<NotificationTracking>();
  const { getNotification, notification } = useGetNotification();
  const [notificationCount, setNotificationCount] = useState<number>(0);
  useEffect(() => {
    getTracking();
    const intervalId = setInterval(() => {
      const fetchData = () => {
        getTracking();
      };
      fetchData();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    getNotification();
  }, [toggleReload]);
  useEffect(() => {
    if (notification) {
      const filterCount = notification.filter((item) => item.idStatus === 1);
      setNotificationCount(filterCount?.length);
    }
  }, [notification]);

  // useEffect(() => {
  //   setAudio(new Audio("/src/assets/mp3/alarm.mp3"));
  // }, []);
  // useEffect(() => {
  //   if (tracking && tracking.length > 0 && !mute) {
  //     audio.loop = true; // Reproduce el audio en bucle
  //     audio.play();
  //   } else {
  //     audio.pause(); // Pausa la reproducción si no hay tracking o si está silenciado
  //   }
  //   // Limpia el audio cuando se desmonta el componente para evitar fugas de memoria
  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, [tracking, mute]);

  return (
    <div>
      <AppAuthorizationGuard
        roles={AppConfig["tracking.managerPage.authorization"] as UserRole[]}
        redirect={{ to: "/" }}
      >
        {!tracking && <AppLoading />}
        <AppTrackingModal
          isVisible={visibleTrackingModal}
          onClose={() => setVisibleTrackingModal(false)}
          onReload={() => {
            setToggleReload(!toggleReload);
          }}
          // toggle={toggle}
        />
        <AppPageTransition>
          <div className="items-center mx-auto ">
            <AppTrackingNotificationCenter
              isVisible={visibleNotificationCenter}
              onClose={() => setVisibleNotificationCenter(false)}
              notification={notification}
              onViewNotification={(item) => {
                setNotificationSelected(item);
                setVisibleNotificationDetailModal(true);
              }}
              translation={translation}
            />
            <AppViewNotificationModal
              notification={notificationSelected}
              onClose={() => {
                setVisibleNotificationDetailModal(false);
              }}
              isVisible={visibleNotificationDetailModal}
              onReload={() => {
                setToggleReload(!toggleReload);
              }}
            />
            <AppTrackingHeader
              onShowNotifications={() => {
                setVisibleNotificationCenter(true);
              }}
              onSearch={(id: number | undefined) => {
                if (id) {
                  localStorage.setItem("trackingId", String(id));
                }
                setVisibleTrackingModal(true);
              }}
              notificationCount={notificationCount}
              translation={translation}
            />
            <div className="container mx-auto my-5 ">
              {/* {tracking && tracking.length > 0 ? (
                <div
                  className={"w-full flex flex-row items-end justify-end mb-5"}
                >
                  <div
                    className={
                      mute === false
                        ? " flex flex-row items-end justify-end mb-5 border-8 border-danger-400 animate-pulse bg-danger-500  rounded-full"
                        : "flex flex-row items-end justify-end mb-5 border-8 border-opacity-0 bg-white rounded-full "
                    }
                  >
                    <Button
                      isIconOnly
                      color="danger"
                      onClick={() => setMute(!mute)}
                    >
                      {mute ? (
                        <Icon.Volume2 size={15} />
                      ) : (
                        <Icon.VolumeX size={15} />
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              )} */}
              <AppTrackingsTable
                onEdit={({ record }) => {
                  if (record.personId) {
                    localStorage.setItem("trackingId", String(record.personId));
                    // setTrackingId(record.personId);
                    setVisibleTrackingModal(true);
                  }
                }}
                items={tracking}
                translation={translation}
              />
            </div>
          </div>
        </AppPageTransition>
      </AppAuthorizationGuard>
    </div>
  );
};
