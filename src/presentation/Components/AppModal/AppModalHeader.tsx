import classNames from "classnames";
import { AppHeading, AppHeadingProps } from "../AppHeading";

export interface AppModalHeaderProps extends AppHeadingProps {}

export const AppModalHeader = ({
  children,
  className,
  ...props
}: AppModalHeaderProps) => (
  <div className="flex items-center justify-between px-6 py-4 border-b">
    <AppHeading
      as="h3"
      className={classNames("text-gray-900", className)}
      {...props}
    >
      {children}
    </AppHeading>
  </div>
);
