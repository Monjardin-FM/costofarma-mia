import React from 'react';
import classNames from 'classnames';

export interface AppTheadProps
  extends React.ComponentPropsWithoutRef<'thead'> {}

export const AppThead = ({ children, className, ...props }: AppTheadProps) => (
  <thead className={classNames('bg-gray-100')} {...props}>
    {children}
  </thead>
);
