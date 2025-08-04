import React, { useContext } from 'react';
import { AppRadioGroupContext } from './app-radio-group-context';
import clsx from 'clsx';

export type AppRadioGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'role' | 'aria-checked' | 'onClick' | 'aria-hidden'
> & {
  value?: any;
};

export const AppRadioGroupItem = ({
  value,
  children,
  className,
  ...props
}: AppRadioGroupItemProps) => {
  const ctx = useContext(AppRadioGroupContext);
  return (
    <div
      role="radio"
      aria-checked={ctx.value === value}
      onClick={() => {
        if (!ctx.disabled) {
          ctx.onChange(value);
        }
      }}
      aria-hidden="true"
      className={clsx('focus:outline-none', className, {
        'opacity-80 cursor-not-allowed': ctx.disabled,
        'cursor-pointer': !ctx.disabled,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
