import React from 'react';
import clsx from 'clsx';

export const AppMessage = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => (
  <div
    className={clsx('flex items-center justify-center flex-col', className)}
    {...props}
  >
    {children}
  </div>
);
