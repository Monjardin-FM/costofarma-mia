import React from "react";
import clsx from "clsx";
export type AppHeroProps = React.ComponentPropsWithoutRef<"div"> & {
  size?: "base" | "lg" | "fullheight" | null;
};

export const AppHero = ({
  children,
  className,
  size = "base",
  ...props
}: AppHeroProps) => (
  <div className="relative">
    <section
      className={clsx(
        "w-full shadow-inner py-12 flex items-center",
        {
          "h-14": size === "base",
          "h-96": size === "lg",
          "min-h-screen": size === "fullheight",
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  </div>
);
