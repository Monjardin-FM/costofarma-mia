import { ReactNode, ComponentPropsWithoutRef } from "react";
import AppLoader from "react-loader-spinner";

import clsx from "clsx";
import { UIColorScheme } from "../../types/UIColorScheme";
import { UIVariant } from "../../types/UIVariant";

export interface AppButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "disabled"> {
  colorScheme?: UIColorScheme;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: "xs" | "sm" | "base" | "lg";
  variant?: UIVariant;
}

export const AppButton = ({
  children,
  className,
  type = "button",
  colorScheme = "gray",
  isDisabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  size = "base",
  variant = "solid",
  ...props
}: AppButtonProps) => {
  const buttonTextStyles = {
    ...(variant === "solid" && {
      "text-gray-700": colorScheme === "gray",
      "text-primary-100": colorScheme === "primary",
      "text-success-100": colorScheme === "success",
      "text-info-100": colorScheme === "info",
      "text-warn-100": colorScheme === "warn",
      "text-red-100": colorScheme === "red",
    }),
    ...((variant === "ghost" || variant === "outline") && {
      "text-gray-500": colorScheme === "gray",
      "text-primary-500": colorScheme === "primary",
      "text-success-500": colorScheme === "success",
      "text-info-500": colorScheme === "info",
      "text-warn-600": colorScheme === "warn",
      "text-red-500": colorScheme === "red",
    }),
  };

  const buttonBackgroundStyles = {
    ...(variant === "solid" && {
      "bg-gray-100": colorScheme === "gray",
      "bg-primary-500": colorScheme === "primary",
      "bg-success-500": colorScheme === "success",
      "bg-info-500": colorScheme === "info",
      "bg-warn-500": colorScheme === "warn",
      "bg-red-500": colorScheme === "red",
    }),
    "bg-transparent": variant === "ghost" || variant === "outline",
  };

  const buttonBackgroundHoverStyles = {
    ...(variant === "solid" &&
      !isDisabled && {
        "hover:bg-gray-50": colorScheme === "gray",
        "hover:bg-primary-400": colorScheme === "primary",
        "hover:bg-success-400": colorScheme === "success",
        "hover:bg-info-400": colorScheme === "info",
        "hover:bg-warn-400": colorScheme === "warn",
        "hover:bg-red-400": colorScheme === "red",
      }),
    ...((variant === "ghost" || variant === "outline") && {
      "hover:bg-gray-100": colorScheme === "gray",
      "hover:bg-primary-100": colorScheme === "primary",
      "hover:bg-success-100": colorScheme === "success",
      "hover:bg-info-100": colorScheme === "info",
      "hover:bg-warn-100": colorScheme === "warn",
      "hover:bg-red-100": colorScheme === "red",
    }),
  };

  const buttonSizeStyles = {
    " p-2 text-xs": size === "xs",
    "h-10 px-3 text-sm": size === "sm",
    "h-12 px-4": size === "base",
    "h-16 px-6": size === "lg",
  };

  const buttonShadowStyles = {
    "shadow hover:shadow-lg": variant === "solid",
  };

  const positionStypes = clsx({
    relative: isLoading,
  });

  const BUTTON_DEFAULT_STYLES =
    "font-medium appearance-none transition duration-500 rounded-lg focus:outline-none inline-flex items-center disabled:bg-opacity-70 disabled:cursor-not-allowed";

  const borderColor = {
    ...(variant === "outline" && {
      border: variant === "outline",
      "border-gray-300": colorScheme === "gray",
      "border-primary-500": colorScheme === "primary",
      "border-success-500": colorScheme === "success",
      "border-info-500": colorScheme === "info",
      "border-warn-500": colorScheme === "warn",
      "border-red-500": colorScheme === "red",
    }),
  };
  return (
    <button
      className={clsx(
        BUTTON_DEFAULT_STYLES,
        positionStypes,
        buttonTextStyles,
        buttonBackgroundStyles,
        buttonBackgroundHoverStyles,
        buttonSizeStyles,
        buttonShadowStyles,
        borderColor,
        className
      )}
      type={type}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {leftIcon && (
        <span
          className={clsx("mr-3 flex-none", buttonTextStyles, {
            opacity: isLoading,
          })}
        >
          {leftIcon}
        </span>
      )}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <AppLoader
            type="ThreeDots"
            color={colorScheme === "gray" ? "#4a7270" : "#fff"}
            height={20}
            width={20}
          />
        </span>
      )}

      <span
        className={clsx("flex-grow flex items-center justify-center", {
          "opacity-0": isLoading,
        })}
      >
        {children}
      </span>

      {rightIcon && (
        <span
          className={clsx("ml-3 flex-none", buttonTextStyles, {
            "opacity-0": isLoading,
          })}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
};
