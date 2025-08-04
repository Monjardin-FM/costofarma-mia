import classNames from "classnames";
import React from "react";

type AvailableHeading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export interface AppHeadingProps
  extends React.ComponentPropsWithoutRef<"h1" | "h2"> {
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  as?: AvailableHeading;
}

// export type AppHeadingProps = AvailableHeading & {
//   size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
//   as?: AvailableHeading;
// };

export const AppHeading = ({
  as: tag = "h1",
  size = "base",
  children,
  className,
}: AppHeadingProps) => {
  const Tag = tag as AvailableHeading;
  return (
    <Tag
      className={classNames(
        "font-semibold",
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-base": size === "base",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
          "text-3xl": size === "3xl",
          "text-4xl": size === "4xl",
        },
        className
      )}
    >
      {children}
    </Tag>
  );
};
