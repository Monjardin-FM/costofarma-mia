import { useContext } from "react";
// import * as Icon from "feather-icons";
import { AppAlertContext } from "./AppAlertContext";
import { AppButton, AppButtonProps } from "../AppButton";

export type AppAlertCloseButtonProps = Omit<
  AppButtonProps,
  "colorScheme" | "variant"
>;

export const AppAlertCloseButton = (props: AppAlertCloseButtonProps) => {
  const { colorSchema } = useContext(AppAlertContext);
  return (
    <span className="flex-none pl-3">
      <AppButton variant="ghost" colorScheme={colorSchema} {...props}>
        {/* <Icon/> */}
      </AppButton>
    </span>
  );
};
