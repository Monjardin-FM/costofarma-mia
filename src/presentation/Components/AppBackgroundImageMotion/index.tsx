import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export type AppBackgroundMotionProps = React.ComponentPropsWithRef<"div"> & {
  backgroundImage: string;
  scale?: number;
  number?: number;
  duration?: number;
  repeat?: number;
};

export const AppBackgroundImageMotion = ({
  children,
  className,
  backgroundImage,
  scale = 1.2,
  duration = 10,
  repeat = 20,
  ...props
}: AppBackgroundMotionProps) => (
  <div
    className={clsx("w-full flex items-center justify-center", className)}
    {...props}
  >
    <div className="w-full h-full overflow-hidden ">
      <motion.div
        className="w-full h-full"
        style={{
          background: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        transition={{ repeat, repeatType: "reverse", duration }}
        initial={{
          scale,
        }}
        animate={{
          scale: 1,
        }}
        exit={{
          scale,
        }}
      />
    </div>

    <div className="absolute flex justify-center items-center w-full">
      {children}
    </div>
  </div>
);
