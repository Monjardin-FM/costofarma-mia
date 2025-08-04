import { createContext } from 'react';

export type AppRadioGroupContextContext = {
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
};

export const AppRadioGroupContext = createContext<AppRadioGroupContextContext>({
  value: null,
  onChange: () => {},
  disabled: false,
});
