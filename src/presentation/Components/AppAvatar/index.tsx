import React from "react";
import classNames from "classnames";
import { UIColorScheme } from "../../types/UIColorScheme";

export interface AppAvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  colorSchema?: UIColorScheme;
}

export const AppAvatar = ({
  children,
  className,
  colorSchema = "gray",
  ...props
}: AppAvatarProps) => (
  <div
    className={classNames("inline-block p-1 border-2 rounded-full", {
      "border-gray-300": colorSchema === "gray",
      "border-primary-600": colorSchema === "primary",
      "border-success-600": colorSchema === "success",
      "border-info-600": colorSchema === "info",
      "border-warn-600": colorSchema === "warn",
      "border-red-600": colorSchema === "red",
    })}
  >
    <div
      className={classNames(
        "w-10 h-10 font-semibold rounded-full flex items-center justify-center text-sm tracking-wide overflow-hidden",
        {
          "text-gray-700 bg-gray-100": colorSchema === "gray",
          "text-primary-100 bg-primary-600": colorSchema === "primary",
          "text-success-100 bg-success-600": colorSchema === "success",
          "text-info-100 bg-info-600": colorSchema === "info",
          "text-warn-100 bg-warn-600": colorSchema === "warn",
          "text-red-100 bg-red-600": colorSchema === "red",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  </div>
);
