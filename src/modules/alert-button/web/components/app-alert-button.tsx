import { Button } from "@nextui-org/react";
import { useGetTracking } from "../../../tracking/web/hooks/use-get-tracking";
import { useEffect, useRef, useState } from "react";
import * as Icon from "react-feather";
import { useToggle } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { AppAlertCard } from "./app-alert-card";
import { Tracking } from "../../../tracking/domain/entities/tracking";
import { AppTrackingModal } from "../../../tracking/web/components/modals/app-tracking-modal";
import { useTranslation } from "react-i18next";
export const AppAlertButton = () => {
  const { t: translation } = useTranslation("AlertNotification");
  const { tracking, getTracking } = useGetTracking();
  const [mute, setMute] = useState(false);
  const [audio, setAudio] = useState(new Audio("/src/assets/mp3/alarm.mp3"));
  const [isVisible, setIsVisible] = useToggle(false);
  const [visibleTrackingModal, setVisibleTrackingModal] = useToggle(false);
  const ref = useRef(null);
  const handleClick = (item: Tracking) => {
    if (item.personId) {
      localStorage.setItem("trackingId", String(item.personId));
      setVisibleTrackingModal(true);
    }
  };
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
    setAudio(new Audio("/src/assets/mp3/alarm.mp3"));
  }, []);
  useEffect(() => {
    if (tracking && tracking.length > 0 && !mute) {
      audio.loop = true; // Reproduce el audio en bucle
      audio.play();
    } else {
      audio.pause(); // Pausa la reproducción si no hay tracking o si está silenciado
    }
    // Limpia el audio cuando se desmonta el componente para evitar fugas de memoria
    return () => {
      //   audio.pause();
      audio.currentTime = 0;
    };
  }, [tracking, mute]);
  return (
    <div>
      <AppTrackingModal
        isVisible={visibleTrackingModal}
        onClose={() => setVisibleTrackingModal(false)}
        onReload={() => {
          //   setToggleReload(!toggleReload);
        }}
        // toggle={toggle}
      />
      <Button
        onClick={() => setIsVisible(true)}
        isIconOnly
        color="danger"
        className="right-16 top-7 absolute z-30"
      >
        <Icon.AlertCircle size={18} />
      </Button>
      <AnimatePresence>
        {isVisible && (
          <motion.aside
            ref={ref}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{
              opacity: 0,
              x: 30,
            }}
            className="fixed z-40 inline-block px-10 py-12 overflow-y-auto bg-primaryColor-800 shadow-lg inset-y-0 right-0 rounded-xl  bg-opacity-50 filter backdrop-filter backdrop-blur-sm  hover:bg-opacity-100 transition ease-in-out duration-700 "
          >
            <div className="flex flex-row items-center justify-center">
              <Button isIconOnly color="warning" onClick={() => setMute(!mute)}>
                {mute ? <Icon.Volume2 size={15} /> : <Icon.VolumeX size={15} />}
              </Button>
              <h1 className="font-bold text-white place-self-center justify-self-center w-full text-center ">
                {translation("Title")}
              </h1>
              <Button
                onPress={() => setIsVisible(false)}
                variant="light"
                className=" text-white"
                isIconOnly
                color="default"
              >
                <Icon.X size={20} />
              </Button>
            </div>
            <AppAlertCard
              alert={tracking}
              handleClick={(item) => {
                handleClick(item);
              }}
              translation={translation}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};
