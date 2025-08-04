import { useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type AppNotificationProps = {
  notificationText?: string;
  icon?: any;
  theme?: "dark" | "light" | "colored";
  type?: "default" | "error" | "info" | "success" | "warning";
};

export const AppNotification = ({
  notificationText,
  // theme = "light",
  // icon,
  type = "default",
}: AppNotificationProps) => {
  useEffect(() => {
    toast(`${notificationText}`, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      // theme: theme,
      // icon: icon,
      type: type,
    });
  }, []);
  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      transition={Slide}
      style={{ width: "300px" }}
      // theme={theme}
    />
  );
};
