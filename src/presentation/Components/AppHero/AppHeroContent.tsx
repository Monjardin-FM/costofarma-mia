import React from 'react';
import clsx from 'clsx';

export type AppHeroContentProps = React.ComponentPropsWithoutRef<'div'>;

export const AppHeroContent = ({
  children,
  className,
  ...props
}: AppHeroContentProps) => (
  <div className={clsx('container mx-auto ', className)} {...props}>
    {children}
  </div>
);
