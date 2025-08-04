import { ComponentPropsWithoutRef } from "react";

export interface AppTooltipProps
  extends Omit<ComponentPropsWithoutRef<"button">, "disabled"> {}

export const AppTooltip = ({ children }: AppTooltipProps) => {
  return (
    <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
      <div className="relative z-30 inline-flex">
        <div className="relative -top-9">
          <div className="absolute top-0 z-10 w-48 p-2 -mt-1 text-sm leading-tight text-white font-medium transform -translate-x-1/2 -translate-y-full bg-info-400 rounded-lg shadow-lg ">
            {children}
          </div>
          <svg
            className="absolute z-10 w-6 h-6 text-info-400 transform -translate-x-12 -translate-y-3 fill-current stroke-current left-8"
            width="8"
            height="8"
          >
            <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
          </svg>
        </div>
      </div>
    </div>
  );
};
