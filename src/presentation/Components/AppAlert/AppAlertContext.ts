import React from "react";
import { UIColorScheme } from "../../types/UIColorScheme";

export const AppAlertContext = React.createContext<{
  colorSchema?: UIColorScheme;
}>({
  colorSchema: "gray",
});
