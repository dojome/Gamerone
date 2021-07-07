import React, { useState } from 'react';
import cn from 'classnames';

import './style.scss';

export interface TabNavOption {
  key: string | number;
  title: string;
}
interface TabNavProps {
  options?: TabNavOption[];
  active?: number;
  onSelected?: (t: number) => void;
}

const TabNav: React.FC<TabNavProps> = ({
  options = [],
  active = 0,
  onSelected,
}: TabNavProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(active);

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
    if (onSelected) onSelected(index);
  };

  return (
    <ul className="tab-nav" data-testid="tab-nav">
      {options.map(({ key, title }, index) => (
        <li key={key}>
          <span
            onClick={() => handleOptionClick(index)}
            className={cn({ 'is-active': selectedIndex === index })}
          >
            {title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TabNav;
