import React, { ReactNode } from 'react';
import cn from 'classnames';
import './style.scss';

export interface GridSpacerProps {
  size: 1 | 2 | 3 | 4 | 5;
  children?: ReactNode;
}

const GridSpacer: React.FC<GridSpacerProps> = ({
  size,
  children,
}: GridSpacerProps): JSX.Element => {
  const classes = cn({
    [`grid-spacer--${size}`]: !!size,
  });

  return <div className={classes}>{children}</div>;
};

export default GridSpacer;
