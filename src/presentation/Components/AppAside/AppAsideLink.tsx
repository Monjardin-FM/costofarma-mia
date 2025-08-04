import { ReactNode } from "react";
import clsx from "clsx";
import { useMatch, Link } from "react-router-dom";

export type AppAsideLinkProps = {
  icon?: ReactNode;
  label?: ReactNode;
  to: string;
  exact?: boolean;
};

export const AppAsideLink = ({ icon, label, to }: AppAsideLinkProps) => {
  const match = useMatch({
    path: to,
  });
  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center p-3 rounded-lg hover:bg-primary-300  transition ease-in-out duration-50",
        {
          "bg-primary-100": match,
          "bg-transparent": !match,
        }
      )}
    >
      <div
        className={clsx({
          "text-primary-600": match,
          "text-primary-500": !match,
        })}
      >
        {icon}
      </div>
      <div
        className={clsx("ml-3 text-sm", {
          "font-semibold text-primary-700": match,
          "font-medium text-primary-500": !match,
        })}
      >
        {label}
      </div>
    </Link>
  );
};
