import React from 'react';
import classNames from 'classnames';

export interface AppInputIconProps
  extends React.ComponentPropsWithoutRef<'span'> {}

export const AppInputIcon = ({
  children,
  className,
  ...props
}: AppInputIconProps) => (
  <span
    className={classNames(
      'absolute inset-y-0 flex items-center justify-center w-12 text-gray-400',
      className,
    )}
    {...props}
  >
    {children}
  </span>
);
