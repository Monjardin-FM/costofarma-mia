import React from 'react';
import classNames from 'classnames';

export interface AppScheetProps extends React.ComponentPropsWithoutRef<'div'> {}

export const AppScheet = ({
  children,
  className,
  ...props
}: AppScheetProps) => (
  <div
    className={classNames(
      'border border-gray-200 shadow-sm rounded-lg p-3',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
