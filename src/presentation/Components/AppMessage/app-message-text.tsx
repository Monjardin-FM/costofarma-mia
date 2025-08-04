import React from 'react';
import clsx from 'clsx';

export type AppMessageTextProps = React.ComponentPropsWithoutRef<'p'>;

export const AppMessageText = ({
  className,
  children,
  ...props
}: AppMessageTextProps) => (
  <p className={clsx('text-gray-700 text-center')} {...props}>
    {children}
  </p>
);
