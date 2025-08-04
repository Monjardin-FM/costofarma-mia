import React from "react";
import clsx from "clsx";
import { AppAlertContext } from "./AppAlertContext";
import { AnimatePresence, motion } from "framer-motion";
import { UIColorScheme } from "../../types/UIColorScheme";

export type AppAlertProps = {
  colorSchema?: UIColorScheme;
  on?: boolean;
} & React.ComponentPropsWithoutRef<"div">;

export const AppAlert = ({
  colorSchema = "gray",
  children,
  className,
  on = true,
  ...props
}: AppAlertProps) => (
  <AppAlertContext.Provider value={{ colorSchema }}>
    <AnimatePresence>
      {on && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className={clsx(
              "px-4 py-4 border rounded-lg font-medium flex items-center",
              {
                "text-gray-500": colorSchema === "gray",
                "text-primary-500": colorSchema === "primary",
                "text-success-500": colorSchema === "success",
                "text-info-500": colorSchema === "info",
                "text-warn-700": colorSchema === "warn",
                "text-red-500": colorSchema === "red",
              },
              {
                "border-gray-500": colorSchema === "gray",
                "border-primary-500": colorSchema === "primary",
                "border-success-500": colorSchema === "success",
                "border-info-500": colorSchema === "info",
                "border-warn-700": colorSchema === "warn",
                "border-red-500": colorSchema === "red",
              },
              className
            )}
            {...props}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </AppAlertContext.Provider>
);
