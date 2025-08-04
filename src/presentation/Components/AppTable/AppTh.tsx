import React from 'react';
import classNames from 'classnames';

export interface AppThProps extends React.ComponentPropsWithoutRef<'th'> {
  type?: 'numeric' | 'text' | 'custom';
  align?: 'left' | 'right' | 'center';
}

export const AppTh = ({
  children,
  className,
  type = 'text',
  align = 'left',
  ...props
}: AppThProps) => (
  <th
    className={classNames(
      'p-3 font-semibold text-gray-600 text-sm',
      {
        'text-right': align === 'right',
        'text-left': align === 'left',
        'text-center': align === 'center',
      },
      className,
    )}
    {...props}
  >
    {children}
  </th>
);
