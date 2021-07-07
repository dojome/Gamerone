import React from 'react';
import cn from 'classnames';
import './style.scss';

export interface TooltipProps {
  text: string;
  position?: 'top' | 'bottom-left';
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position,
  children,
}: TooltipProps): JSX.Element => {
  const toolTipClasses = cn('tooltip ', {
    [`tooltip--${position}`]: !!position,
  });

  return (
    <div className="tooltip-wrapper">
      <span className={toolTipClasses}>{text}</span>
      {children}
    </div>
  );
};

export default Tooltip;
