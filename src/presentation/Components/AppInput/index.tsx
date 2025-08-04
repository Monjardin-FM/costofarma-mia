import React, { ReactNode } from "react";
import clsx from "clsx";
import { AppInputIcon } from "./AppInputIcon";
import { UIColorScheme } from "../../types/UIColorScheme";

export type AppInputProps = {
  colorSchema?: UIColorScheme;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
};

export function AppInput<P>(WrappedComponent: React.ComponentType<P>) {
  const Component = (props: P & AppInputProps) => {
    const { colorSchema, leftIcon, rightIcon, ...allProps } = props;
    const componentProps: P = {
      ...(allProps as P),
      className: clsx(
        "w-full font-medium appearance-none focus:outline-none rounded-lg transition duration-200 bg-gray-50 text-gray-800 border-2 focus:border-primary-500 py-3 focus:ring-transparent disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed",
        {
          "pl-12": props.leftIcon,
          "pl-4": !props.leftIcon,
          "pr-12": props.rightIcon,
          "pr-4": !props.rightIcon,
          "border-gray-200": !props.colorSchema || props.colorSchema === "gray",
          "border-primary-500": props.colorSchema === "primary",
          "border-success-500": props.colorSchema === "success",
          "border-info-500": props.colorSchema === "info",
          "border-warn-500": props.colorSchema === "warn",
          "border-red-500": props.colorSchema === "red",
        },
        props.className
      ),
    };
    return (
      <div
        className={clsx("w-full", {
          relative: props.leftIcon || props.rightIcon,
        })}
      >
        <WrappedComponent {...(componentProps as any)} />

        {props.leftIcon && (
          <AppInputIcon className="left-0">{props.leftIcon}</AppInputIcon>
        )}

        {props.rightIcon && (
          <AppInputIcon className="right-0">{props.rightIcon}</AppInputIcon>
        )}
      </div>
    );
  };

  return Component;
}
