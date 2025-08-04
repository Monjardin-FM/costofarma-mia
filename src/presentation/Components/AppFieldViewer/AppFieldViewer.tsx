import React from 'react';
import clsx from 'clsx';

type AppFieldViewerProps = React.ComponentPropsWithoutRef<'div'>;

export const AppFieldViewer = ({
  children,
  className,
  ...props
}: AppFieldViewerProps) => (
  <div className={clsx('flex flex-col', className)} {...props}>
    {children}
  </div>
);
