import React from 'react';

export interface AppTbodyProps
  extends React.ComponentPropsWithoutRef<'tbody'> {}

export const AppTbody = ({ children, ...props }: AppTbodyProps) => (
  <tbody {...props}>{children}</tbody>
);
