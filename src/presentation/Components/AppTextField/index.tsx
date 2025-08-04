import React, { useContext } from "react";
import clsx from "clsx";
import { AppInput, AppInputProps } from "../AppInput";
import { AppFormContext } from "../AppForm";

export type AppTextFieldProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "children" | "className"
> &
  AppInputProps;

const AppTextField = ({
  required,
  type = "text",
  className,
  onWheel,
  ...props
}: AppTextFieldProps) => {
  const { isRequired } = useContext(AppFormContext);

  return (
    <input
      type={type}
      required={isRequired || required}
      className={clsx("form-input", className)}
      onWheel={(event) => {
        if (onWheel) onWheel(event);
        else if (type === "number") event.currentTarget.blur();
      }}
      {...props}
    />
  );
};

export default AppInput(AppTextField);
