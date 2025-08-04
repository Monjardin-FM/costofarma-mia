import clsx from 'clsx';
import React from 'react';

export type AppHeroActionButtonProps = React.ComponentPropsWithoutRef<'button'>;

export const AppHeroActionButton = ({
  className,
  ...props
}: AppHeroActionButtonProps) => {
  return (
    <button
      className={clsx(
        'text-white opacity-75 hover:opacity-100 transition duration-700 appearance-none focus:outline-none p-2 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
};
