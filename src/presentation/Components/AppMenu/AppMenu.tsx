import React, { useRef } from 'react';
import classNames from 'classnames';
import { useToggle, useClickAway } from 'react-use';
import { AppMenuContext } from './AppMenuContext';

export interface AppMenuProps extends React.ComponentPropsWithoutRef<'div'> {}

export const AppMenu = ({ children, className, ...props }: AppMenuProps) => {
  const [on, toggle] = useToggle(false);

  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => toggle(false));

  return (
    <AppMenuContext.Provider
      value={{
        on,
        toggle,
      }}
    >
      <div ref={ref} className={classNames('relative', className)} {...props}>
        {children}
      </div>
    </AppMenuContext.Provider>
  );
};
