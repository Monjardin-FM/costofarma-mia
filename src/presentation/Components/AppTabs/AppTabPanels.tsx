import React from 'react';
import clsx from 'clsx';
import { appTabMapper } from './app-tab-mapper';

export type AppTabPanelsProps = React.ComponentPropsWithoutRef<'div'>;

export const AppTabPanels = ({
  className,
  children,
  ...props
}: AppTabPanelsProps) => {
  return (
    <div className={clsx('mt-6', className)} {...props}>
      {appTabMapper({ children, componentName: 'AppTabPanel' })}
    </div>
  );
};
