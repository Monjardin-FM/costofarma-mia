import React from 'react';

export const AppMenuContext = React.createContext<{
  toggle: (nextValue?: any) => void;
  on: boolean;
}>({
  toggle: () => {},
  on: false,
});
