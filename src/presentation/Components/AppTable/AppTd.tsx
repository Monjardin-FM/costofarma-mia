import React from 'react';
import classNames from 'classnames';

export interface AppTdProps extends React.ComponentPropsWithoutRef<'td'> {
  type?: 'numeric' | 'text' | 'custom';
  align?: 'left' | 'right' | 'center';
}

export const AppTd = ({
  children,
  className,
  type = 'text',
  align = 'left',
  ...props
}: AppTdProps) => (
  <td
    className={classNames(
      'p-4 text-sm font-medium',
      {
        'text-gray-600': type !== 'custom',
        'tracking-wide': type === 'numeric',
        'text-right': align === 'right',
        'text-left': align === 'left',
        'text-center': align === 'center',
      },
      className,
    )}
    {...props}
  >
    {children}
  </td>
);
