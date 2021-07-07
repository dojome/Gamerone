import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Badge, { BadgeSize } from '../Badge';
import Icon, { IconName } from '../Icon';
import cn from 'classnames';
import './style.scss';
import Image from '../Image';

interface DataItemContentProps {
  label: string;
  icon?: IconName;
  imageSrc?: string;
  value?: string | number;
  badgeSize?: BadgeSize;
}

const DataItemContent: React.FC<DataItemContentProps> = ({
  label,
  icon,
  imageSrc,
  value,
  badgeSize,
}: DataItemContentProps): JSX.Element => {
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
    <>
      <Badge type="flat" size={badgeSize} testid="data-item-badge">
        {icon ? (
          <Icon name={icon} size="125x" />
        ) : imageSrc ? (
          <Image src={imageSrc} alt={label} width={imageSize(badgeSize)} />
        ) : (
          <span className="number">{value}</span>
        )}
      </Badge>
      <label className="data-item__label">{label}</label>
    </>
  );
};

export interface DataItemProps {
  icon?: IconName;
  imageSrc?: string;
  value?: string | number;
  label: string;
  link?: string;
  activeClassName?: string;
  badgeSize?: BadgeSize;
}
const DataItem: React.FC<DataItemProps> = ({
  icon,
  imageSrc,
  value,
  label,
  link,
  activeClassName,
  badgeSize,
}: DataItemProps): JSX.Element => {
  const classes = cn('data-item', {
    [`data-item--link`]: !!link,
    [`data-item--${badgeSize}`]: !!badgeSize,
  });

  return link ? (
    <>
      {link.startsWith('http') ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          <DataItemContent
            icon={icon}
            label={label}
            value={value}
            imageSrc={imageSrc}
            badgeSize={badgeSize}
          />
        </a>
      ) : activeClassName ? (
        <NavLink
          to={link}
          className={classes}
          activeClassName={activeClassName}
        >
          <DataItemContent
            icon={icon}
            label={label}
            value={value}
            imageSrc={imageSrc}
            badgeSize={badgeSize}
          />
        </NavLink>
      ) : (
        <Link to={link} className={classes}>
          <DataItemContent
            icon={icon}
            label={label}
            value={value}
            imageSrc={imageSrc}
            badgeSize={badgeSize}
          />
        </Link>
      )}
    </>
  ) : (
    <div className={classes}>
      <DataItemContent
        icon={icon}
        label={label}
        value={value}
        imageSrc={imageSrc}
        badgeSize={badgeSize}
      />
    </div>
  );
};

export default DataItem;
