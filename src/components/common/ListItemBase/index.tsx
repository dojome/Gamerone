import React, { ReactNode } from 'react';
import cn from 'classnames';
import './style.scss';

interface ListItemBaseProps {
  onClick?: (e?: any) => void;
  appendRight?: ReactNode;
  children?: ReactNode;
}

const ListItemBase: React.FC<ListItemBaseProps> = ({
  onClick,
  appendRight,
  children,
  ...props
}: ListItemBaseProps): JSX.Element => {
  const listItemClasses = cn('list-item', {
    'list-item--clickable': onClick,
    'has-append-right': appendRight,
  });

  return (
    <div className={listItemClasses} onClick={onClick} {...props}>
      {appendRight && (
        <div className="list-item__append-right">{appendRight}</div>
      )}
      {children}
    </div>
  );
};

export default ListItemBase;
