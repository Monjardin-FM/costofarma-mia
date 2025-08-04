import React from 'react';
import clsx from 'clsx';

export type AppFieldViewerValueProps = React.ComponentPropsWithoutRef<'div'>;

export const AppFieldViewerValue = ({
  children,
  className,
  ...props
}: AppFieldViewerValueProps) => (
  <div className={clsx('text-gray-700 font-semibold', className)} {...props}>
    {children}
  </div>
);
