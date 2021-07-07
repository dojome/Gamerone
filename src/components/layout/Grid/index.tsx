import React, { ReactNode } from 'react';
import './style.scss';

export interface GridProps {
  children: ReactNode;
}

const Grid: React.FC<GridProps> = ({ children }: GridProps): JSX.Element => {
  return <div className="grid">{children}</div>;
};

export default Grid;
