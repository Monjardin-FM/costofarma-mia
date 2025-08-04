import React from 'react';
import clsx from 'clsx';

export const AppMessageTitle = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'h2'>) => (
  <h2
    className={clsx('text-xl font-medium text-gray-700 text-center', className)}
    {...props}
  >
    {children}
  </h2>
);
