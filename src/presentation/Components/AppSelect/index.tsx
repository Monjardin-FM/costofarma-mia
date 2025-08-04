import React, { useContext } from "react";

import clsx from "clsx";
import { AppInput, AppInputProps } from "../AppInput";
import { AppFormContext } from "../AppForm";

export type AppTextFieldProps = Omit<
  React.ComponentPropsWithoutRef<"select">,
  "children" | "className"
> &
  AppInputProps;

export type AppSelectProps = React.ComponentPropsWithoutRef<"select">;

const AppSelect = ({
  children,
  required,
  className,
  ...props
}: AppSelectProps) => {
  const { isRequired } = useContext(AppFormContext);
  return (
    <select
      required={isRequired || required}
      className={clsx(" h-10 text-tiny p-0 m-0", className)}
      {...props}
    >
      {children}
    </select>
  );
};

export default AppInput(AppSelect);
