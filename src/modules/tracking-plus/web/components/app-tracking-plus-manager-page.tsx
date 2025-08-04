import { useEffect, useState } from "react";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import AppConfig from "../../../../settings.json";
import { UserRole } from "../../../user/domain/entities/user-role";
import { useGetTrackingPlus } from "../hooks/use-get-tracking-plus";
import { useShowAlerts } from "../hooks/use-show-alerts";
import { AppTrackingPlusHeader } from "./app-tracking-plus-header";
import { AppTrackingPlussTable } from "./tables/app-tracking-plus-table";
import { AppToast } from "../../../../presentation/Components/AppToast";
import { Button } from "@nextui-org/react";
import * as Icon from "react-feather";
export const AppTrackingPlusManagerPage = () => {
  const { getTrackingPlus, trackingPlus } = useGetTrackingPlus();
  const [mute, setMute] = useState(false);
  const [audio, setAudio] = useState(new Audio("/src/assets/mp3/alarm.mp3"));

  const {
    showAlerts,
    loading: loadingShowAlerts,
    error: errorShowAlert,
  } = useShowAlerts();

  const handleShowAlert = async (idPerson: number) => {
    await showAlerts({ idPerson: idPerson, showalerts: true });
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

  useEffect(() => {
    getTrackingPlus();
    const intervalId = setInterval(() => {
      const fetchData = () => {
        getTrackingPlus();
      };
      fetchData();
    }, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    setAudio(new Audio("/src/assets/mp3/alarm.mp3"));
  }, []);
  useEffect(() => {
    if (trackingPlus && trackingPlus.length > 0 && !mute) {
      audio.loop = true; // Reproduce el audio en bucle
      audio.play();
    } else {
      audio.pause(); // Pausa la reproducción si no hay tracking o si está silenciado
    }
    // Limpia el audio cuando se desmonta el componente para evitar fugas de memoria
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [trackingPlus, mute]);
  return (
    <div>
      <AppAuthorizationGuard
        roles={
          AppConfig["userManagement.managerPage.authorization"] as UserRole[]
        }
        redirect={{ to: "/" }}
      >
        <AppPageTransition>
          <div className="items-center mx-auto ">
            <AppTrackingPlusHeader />
            <div className="container mx-auto my-5 ">
              {trackingPlus && trackingPlus.length > 0 ? (
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
              )}
              <AppTrackingPlussTable
                loadingShowAlerts={loadingShowAlerts}
                items={trackingPlus}
                onShowAlerts={({ record }) => {
                  handleShowAlert(record.personId);
                }}
              />
            </div>
          </div>
        </AppPageTransition>
      </AppAuthorizationGuard>
    </div>
  );
};
