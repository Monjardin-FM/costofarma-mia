import React from 'react';
import { AppRadioGroupContext } from './app-radio-group-context';

export type AppRadioGroupProps<T> = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  disabled?: boolean;
  value?: T | null;
  onChange?: (value: T) => void;
};

export function AppRadioGroup<T>({
  value,
  onChange = () => {},
  children,
  disabled = false,
  ...props
}: AppRadioGroupProps<T>) {
  return (
    <AppRadioGroupContext.Provider
      value={{
        value,
        onChange,
        disabled,
      }}
    >
      <div {...props}>{children}</div>
    </AppRadioGroupContext.Provider>
  );
}
