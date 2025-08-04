import React from 'react';
import clsx from 'clsx';

export type AppFieldViewerLabelProps = React.ComponentPropsWithoutRef<'div'>;

export const AppFieldViewerLabel = ({
  children,
  className,
  ...props
}: AppFieldViewerLabelProps) => (
  <span
    className={clsx('block pb-2 text-gray-600 font-medium text-sm', className)}
    {...props}
  >
    {children}
  </span>
);
