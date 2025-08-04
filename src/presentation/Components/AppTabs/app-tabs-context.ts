import React from 'react';

export const AppTabsContext = React.createContext<{
  index?: number | null;
  onChange: (index: number) => void;
}>({
  index: 0,
  onChange: () => {},
});
