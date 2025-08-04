import React from 'react';
import classNames from 'classnames';

export interface AppModalFooterProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const AppModalFooter = ({
  children,
  className,
  ...props
}: AppModalFooterProps) => (
  <div
    className={classNames(
      'px-3 py-4 font-medium flex justify-end bg-gray-100 rounded-b-lg space-x-6',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
