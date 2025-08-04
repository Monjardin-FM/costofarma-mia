import { useContext, ReactNode } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { AppMenuContext } from "./AppMenuContext";

export interface AppMenuListProps {
  children?: ReactNode;
  className?: string;
}

export const AppMenuList = ({ children, className }: AppMenuListProps) => {
  const { on } = useContext(AppMenuContext);

  return (
    <AnimatePresence>
      {on && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classNames(
            "z-50 absolute mt-3 right-0 bg-white shadow-lg rounded-lg bg-opacity-80 filter backdrop-filter backdrop-blur w-48 overflow-hidden",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
