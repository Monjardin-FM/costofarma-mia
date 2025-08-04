import React from 'react';
import clsx from 'clsx';

export type AppAlertDescriptionProps = React.ComponentPropsWithoutRef<'span'>;

export const AppAlertDescription = ({
  children,
  className,
  ...props
}: AppAlertDescriptionProps) => (
  <span className={clsx('flex-grow text-sm', className)} {...props}>
    {children}
  </span>
);
