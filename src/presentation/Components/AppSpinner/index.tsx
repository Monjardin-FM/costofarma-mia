import React from 'react';
import Loader from 'react-loader-spinner';

export type AppSpinnerProps = React.ComponentPropsWithoutRef<'div'>;

export const AppSpinner = (props: AppSpinnerProps) => {
  return (
    <div {...props}>
      <Loader type="Oval" color="#939f9c" height={32} width={32} />
    </div>
  );
};
