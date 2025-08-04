import React from 'react';
import classNames from 'classnames';
import { AppFormContext } from './AppFormContext';

export interface AppFormFieldProps
  extends React.ComponentPropsWithoutRef<'div'> {
  isRequired?: boolean;
}

export const AppFormField = ({
  children,
  className,
  isRequired = false,
  ...props
}: AppFormFieldProps) => (
  <AppFormContext.Provider value={{ isRequired }}>
    <div className={classNames('w-full', className)} {...props}>
      {children}
    </div>
  </AppFormContext.Provider>
);
