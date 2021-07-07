import React from 'react';

interface TabPaneProps {
  id?: string;
  key: string | number;
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function TabPane({ id, children, ...props }: TabPaneProps) {
  return (
    <div id={id && id + '-tab'} style={{ marginTop: '1.25rem' }} {...props}>
      {children}
    </div>
  );
}
