import React, { useContext } from 'react';

import { AppTabsContext } from './app-tabs-context';

export type AppTabPanelProps = React.ComponentPropsWithoutRef<'div'> & {
  tabPosition?: number;
  tabsLength?: number;
};

export const AppTabPanel = ({
  children,
  tabPosition,
  tabsLength,
  ...props
}: AppTabPanelProps) => {
  const ctx = useContext(AppTabsContext);
  return <>{ctx.index === tabPosition && <div {...props}>{children}</div>}</>;
};

AppTabPanel.displayName = 'AppTabPanel';
