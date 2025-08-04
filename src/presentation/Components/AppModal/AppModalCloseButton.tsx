import { useContext } from "react";
import * as Icon from "react-feather";
import { AppButton } from "../AppButton";
import { AppModalContext } from "./AppModal";

export const AppModalCloseButton = () => {
  const { onClose } = useContext(AppModalContext);
  return (
    <AppButton
      onClick={onClose}
      variant="ghost"
      className="absolute right-3 top-1"
    >
      <Icon.X size={20} />
    </AppButton>
  );
};
