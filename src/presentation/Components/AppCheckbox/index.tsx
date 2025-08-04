import clsx from "clsx";
import React from "react";

export type AppCheckboxProps = React.ComponentPropsWithoutRef<"input">;

export const AppCheckbox = ({
  children,
  className,
  ...props
}: AppCheckboxProps) => (
  <label>
    <input
      type="checkbox"
      className={clsx("form-checkbox rounded", className)}
      {...props}
    />
    <span className="ml-2 text-primary-900 font-medium text-sm">
      {children}
    </span>
  </label>
);
