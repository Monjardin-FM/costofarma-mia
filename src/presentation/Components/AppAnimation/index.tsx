import { ReactNode } from "react";
import { AnimatePresence, motion, HTMLMotionProps } from "framer-motion";

export type AppAnimationTypes = "fade";

export type AppAnimationProps = {
  on?: boolean;
  children?: ReactNode;
  animationType?: AppAnimationTypes;
};

export const fadeAnimation: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: -80 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 80 },
};

export const AppAnimation = ({
  on = false,
  animationType = "fade",
  children,
}: AppAnimationProps) => {
  const determinateAnimationType = (
    type: AppAnimationTypes
  ): HTMLMotionProps<"div"> => {
    switch (type) {
      case "fade":
        return fadeAnimation;
      default:
        return fadeAnimation;
    }
  };
  return (
    <AnimatePresence>
      {on && (
        <motion.div {...determinateAnimationType(animationType)}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
