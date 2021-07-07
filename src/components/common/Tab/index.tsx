import React, { useEffect, useState } from 'react';
import TabNav, { TabNavOption } from './TabNav';
import TabPane from './TabPane';
import Dialog, { DialogContent } from '../Dialog';

function investigatePanes(children?: React.ReactNode) {
  const tabPaneTitles: TabNavOption[] = [];

  React.Children.forEach(children, (element) => {
    if (!React.isValidElement(element)) return;

    if (element.type === TabPane) {
      const { title } = element.props;
      tabPaneTitles.push({
        key: element.key || title,
        title,
      });
    }
  });

  return tabPaneTitles;
}

interface TabProps {
  show?: boolean;
  active?: number;
  children?: React.ReactNode;
  tabWidth?: number;
  onClose?: () => void;
}

export default function Tab({
  active = 0,
  children,
  show = false,
  onClose,
}: TabProps) {
  const [options, setOptions] = useState<TabNavOption[]>([]);
  const [activePane, setActivePane] = useState(active);

  useEffect(() => {
    setOptions(investigatePanes(children));
  }, [children]);

  return (
    <Dialog
      title="Profile Settings"
      show={show}
      onClose={onClose}
      testid="user-settings"
    >
      <DialogContent>
        <TabNav
          options={options}
          onSelected={(idx) => setActivePane(idx)}
          active={activePane}
        />
        {React.Children.map(children, (child, index) => {
          if (index !== activePane) return undefined;
          return child;
        })}
      </DialogContent>
    </Dialog>
  );
}
