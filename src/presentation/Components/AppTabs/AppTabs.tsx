import React from 'react';
import { AppTabsContext } from './app-tabs-context';

export type AppTabsProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'onChange'
> & {
  index?: number | null;
  onChange?: (index: number) => void;
};

export const AppTabs = ({
  children,
  index = 0,
  onChange = () => {},
  ...props
}: AppTabsProps) => {
  return (
    <AppTabsContext.Provider
      value={{
        index,
        onChange,
      }}
    >
      <div {...props}>{children}</div>
    </AppTabsContext.Provider>
  );
};
