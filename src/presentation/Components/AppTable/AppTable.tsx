import React from 'react';
import classNames from 'classnames';

export interface AppTableProps
  extends React.ComponentPropsWithoutRef<'table'> {}

export const AppTable = ({ children, className, ...props }: AppTableProps) => (
  <div className="bg-white rounded-lg shadow">
    <table className={classNames('table-auto w-full', className)} {...props}>
      {children}
    </table>
  </div>
);
