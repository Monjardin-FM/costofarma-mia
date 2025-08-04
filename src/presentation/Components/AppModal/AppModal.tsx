import React, { ReactNode } from "react";
import { useLockBodyScroll } from "react-use";
import { motion, AnimatePresence } from "framer-motion";

export type AppModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

export type AppModalContextType = {
  onClose: () => void;
  size: AppModalSize;
};

export const AppModalContext = React.createContext<AppModalContextType>({
  onClose: () => {},
  size: "md",
});

export interface AppModalProps {
  onClose?: () => void;
  children?: ReactNode;
  isVisible?: boolean;
  size?: AppModalSize;
}

export const AppModal = ({
  children,
  onClose = () => {},
  isVisible = false,
  size = "md",
}: AppModalProps) => {
  useLockBodyScroll(isVisible);

  return (
    <AppModalContext.Provider value={{ onClose, size }}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AppModalContext.Provider>
  );
};
