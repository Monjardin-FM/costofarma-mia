import { ReactNode } from "react";
import { motion } from "framer-motion";

export type AppPageTransitionProps = {
  children?: ReactNode;
};

export const AppPageTransition = ({ children }: AppPageTransitionProps) => (
  <motion.div
    initial={{ opacity: 0, y: -80 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 80 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
