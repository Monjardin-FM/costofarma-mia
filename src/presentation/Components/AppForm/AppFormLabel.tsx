import React, { useContext } from "react";
import clsx from "clsx";
import { AppFormContext } from "./AppFormContext";

export interface AppFormLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {
  textColor?: string;
}

export const AppFormLabel = ({
  children,
  className,
  htmlFor,
  textColor,
  ...props
}: AppFormLabelProps) => {
  const { isRequired } = useContext(AppFormContext);
  const defaultStyles =
    "block pl-1 pb-1 font-medium text-sm font-medium text-lg";
  const colorText = {
    "text-gray-400": textColor === "white",
    "text-gray-600": textColor === "",
  };
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(defaultStyles, colorText, className)}
      {...props}
    >
      {children} {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};
