import clsx from "clsx";
import React from "react";

export type AppToggleButtonProps = React.ComponentPropsWithoutRef<"input">;

export const AppToggleButton = ({
  children,
  className,
  ...props
}: AppToggleButtonProps) => {
  const BUTTON_DEFAULT_STYLES =
    "cursor-pointer h-5 w-10 rounded-full appearance-none bg-gray-0 border border-gray-400 checked:bg-gray-200 transition duration-200 relative flex";

  return (
    <div className="w-11 h-6 my-0 mx-2">
      <label htmlFor="toggle-switch">
        <input
          type="checkbox"
          id="toggle-switch"
          className={clsx(BUTTON_DEFAULT_STYLES, className)}
          {...props}
        />
        <span className="ml-2">{children}</span>
      </label>
    </div>
  );
};
