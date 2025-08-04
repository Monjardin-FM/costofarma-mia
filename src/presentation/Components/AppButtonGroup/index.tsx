import React from 'react';
import classNames from 'classnames';

export interface AppButtonGroupProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export const AppButtonGroup = ({
  children,
  className,
  ...props
}: AppButtonGroupProps) => (
  <div className={classNames('space-x-3')} {...props}>
    {children}
  </div>
);
