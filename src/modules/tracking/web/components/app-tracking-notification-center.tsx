import { Button, Tab, Tabs } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import * as Icon from "react-feather";
import { NotificationTracking } from "../../domain/entities/notification";
import { NotificationCard } from "./notification/notification-card";
import { TFunction } from "i18next";

export type AppTrackingNotificationCenterProps = {
  isVisible: boolean;
  onClose?: () => void;
  notification?: NotificationTracking[];
  onViewNotification: (item: NotificationTracking) => void;
  translation: TFunction<[string], undefined>;
};

export const AppTrackingNotificationCenter = ({
  isVisible = false,
  onClose = () => {},
  notification = [],
  onViewNotification,
  translation,
}: AppTrackingNotificationCenterProps) => {
  const [newNotesFiltered, setNewNotesFiltered] =
    useState<NotificationTracking[]>();
  const [readNotesFiltered, setReadNotesFiltered] =
    useState<NotificationTracking[]>();

  const ref = useRef(null);
  useClickAway(ref, onClose);
  const handleClick = (item: NotificationTracking) => {
    onViewNotification(item);
  };
  useEffect(() => {
    if (notification) {
      const newNotes = notification?.filter((item) => item.idStatus === 1);
      setNewNotesFiltered(newNotes);
      const readNotes = notification?.filter((item) => item.idStatus === 2);
      setReadNotesFiltered(readNotes);
    }
  }, [notification]);
  return (
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
          <Button
            onPress={onClose}
            variant="light"
            className="absolute right-3 top-3"
            isIconOnly
            color="default"
          >
            <Icon.X size={20} />
          </Button>
          <h1 className="font-bold text-white place-self-center justify-self-center w-full text-center mb-3">
            {translation("NotificationLabel")}
          </h1>
          <Tabs
            aria-label="options"
            variant="bordered"
            fullWidth
            color="primary"
          >
            <Tab
              key={"newNotes"}
              title={
                <div className="flex items-center space-x-2">
                  {/* <Icon. size={18} /> */}
                  <span>{translation("TabNewNotes")}</span>
                </div>
              }
            >
              <NotificationCard
                notification={newNotesFiltered}
                handleClick={(item) => {
                  handleClick(item);
                }}
                translation={translation}
              />
            </Tab>
            <Tab
              key={"readNotes"}
              title={
                <div className="flex items-center space-x-2">
                  {/* <Icon. size={18} /> */}
                  <span>{translation("TabReadNotes")}</span>
                </div>
              }
            >
              <NotificationCard
                notification={readNotesFiltered}
                handleClick={(item) => {
                  handleClick(item);
                }}
                translation={translation}
              />
            </Tab>
          </Tabs>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
