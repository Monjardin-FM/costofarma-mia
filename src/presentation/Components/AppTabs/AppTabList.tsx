import React from 'react';
import clsx from 'clsx';
import { appTabMapper } from './app-tab-mapper';

export type AppTabListProps = React.ComponentPropsWithoutRef<'div'>;

export const AppTabList = ({
  children,
  className,
  ...props
}: AppTabListProps) => {
  return (
    <div className={clsx('flex w-full', className)} {...props}>
      {appTabMapper({ children, componentName: 'AppTab' })}
    </div>
  );
};
