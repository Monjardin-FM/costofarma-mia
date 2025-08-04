import React from 'react';

export interface AppTrProps extends React.ComponentPropsWithoutRef<'tr'> {}

export const AppTr = ({ children, ...props }: AppTrProps) => (
  <tr {...props}>{children}</tr>
);
