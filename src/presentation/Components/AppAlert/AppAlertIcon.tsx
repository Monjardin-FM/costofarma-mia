import React from 'react';
import clsx from 'clsx';

export type AppAlertIconProps = React.ComponentPropsWithoutRef<'span'>;

export const AppAlertIcon = ({
  children,
  className,
  ...props
}: AppAlertIconProps) => (
  <span className={clsx('flex-none mr-5', className)} {...props}>
    {children}
  </span>
);
