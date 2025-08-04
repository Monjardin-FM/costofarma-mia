import React, { useContext } from 'react';
import { AppMenuContext } from './AppMenuContext';
import classNames from 'classnames';

export interface AppMenuItemProps
  extends React.ComponentPropsWithoutRef<'button'> {}

export const AppMenuItem = ({
  children,
  className,
  onClick,
  ...props
}: AppMenuItemProps) => {
  const { toggle } = useContext(AppMenuContext);
  return (
    <button
      className={classNames(
        'text-gray-800 font-medium text-sm appearance-none focus:outline-none p-4 hover:bg-gray-100 w-full text-left transition duration-700',
        className,
      )}
      onClick={(ev) => {
        toggle(false);
        if (onClick) {
          onClick(ev);
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
