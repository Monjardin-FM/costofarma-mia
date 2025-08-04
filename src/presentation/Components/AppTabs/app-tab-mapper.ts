import React, { ReactNode } from 'react';

export type appTabMapperParams = {
  children: ReactNode;
  componentName: string;
};

export const appTabMapper = ({
  children,
  componentName,
}: appTabMapperParams) => {
  const childrenLength = React.Children.count(children);
  return React.Children.map(children, (child: any, index) => {
    if (child?.type?.displayName === componentName) {
      return React.createElement(child.type, {
        ...{
          ...child.props,
          tabPosition: index,
          tabsLength: childrenLength,
        },
      });
    }
    return child;
  });
};
