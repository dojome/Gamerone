import React, { ReactNode } from 'react';
import ListItemBase from '../ListItemBase';
import Badge, { BadgeType, BadgeSize } from '../Badge';
import Image from '../Image';

interface ListItemProps {
  title: string | null;
  description?: string | null;
  image?: string | null;
  icon?: ReactNode;
  badgeType?: BadgeType;
  badgeSize?: BadgeSize;
  testId?: string;
  onClick?: (e?: any) => void;
  appendRight?: ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  image,
  icon,
  badgeType = '',
  badgeSize,
  testId,
  onClick,
  appendRight,
  ...props
}: ListItemProps): JSX.Element => {
  const imageSize = (size: BadgeSize | undefined) => {
    switch (size) {
      case 'tiny':
        return 28;
      case 'small':
        return 32;
      case 'large':
        return 64;
      case 'xlarge':
        return 80;
      case 'medium':
      default:
        return 48;
    }
  };

  return (
    <ListItemBase
      onClick={onClick}
      appendRight={appendRight}
      data-testid={testId}
      {...props}
    >
      {image && (
        <Badge type={badgeType} size={badgeSize} testid="list-item-badge">
          <Image
            src={image}
            alt={title ? title : ''}
            title={title ? title : ''}
            width={imageSize(badgeSize)}
          />
        </Badge>
      )}
      {icon && (
        <Badge type={badgeType} size={badgeSize} testid="list-item-badge">
          {icon}
        </Badge>
      )}
      <div className="list-item__content">
        {title && <h4>{title}</h4>}
        {description && <p>{description}</p>}
      </div>
    </ListItemBase>
  );
};

export default ListItem;
