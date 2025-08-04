import { useContext } from "react";
import { AppMenuContext } from "./AppMenuContext";
import { AppButton, AppButtonProps } from "../AppButton";

export interface AppMenuButtonProps extends AppButtonProps {}

export const AppMenuButton = ({ children, ...props }: AppMenuButtonProps) => {
  const { toggle } = useContext(AppMenuContext);
  return (
    <AppButton onClick={toggle} {...props}>
      {children}
    </AppButton>
  );
};
