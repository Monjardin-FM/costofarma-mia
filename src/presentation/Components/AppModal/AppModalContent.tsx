import React, { useRef, useContext } from "react";
import { useClickAway } from "react-use";
import clsx from "clsx";
import { AppModalContext } from "./AppModal";

export interface AppModalContentProps
  extends React.ComponentPropsWithoutRef<"div"> {}

export const AppModalContent = ({
  children,
  className,
  ...props
}: AppModalContentProps) => {
  const { onClose, size } = useContext(AppModalContext);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, onClose);

  return (
    <div
      ref={ref}
      className={clsx(
        "bg-white mx-auto rounded-lg shadow-lg relative",
        {
          "max-w-xs": size === "xs",
          "max-w-sm": size === "sm",
          "max-w-md": size === "md",
          "max-w-lg": size === "lg",
          "max-w-xl": size === "xl",
          "max-w-2xl": size === "2xl",
          "max-w-3xl": size === "3xl",
          "max-w-4xl": size === "4xl",
          "max-w-5xl": size === "5xl",
          "max-w-6xl": size === "6xl",
          "max-w-7xl": size === "7xl",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
