import React, { ReactNode, CSSProperties } from 'react';
import cn from 'classnames';
import './style.scss';

export type BadgeType =
  | ''
  | 'flat'
  | 'flat-dark'
  | 'wide'
  | 'outline'
  | 'hashtag';
export type BadgeSize =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'huge';

export interface BadgeProps {
  type?: BadgeType;
  size?: BadgeSize;
  avatar?: boolean;
  testid: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  type,
  size,
  avatar = false,
  testid,
  children,
  style,
  onClick,
  disabled = false,
}: BadgeProps): JSX.Element => {
  const badgeClassName = cn('badge', {
    [`badge--avatar`]: avatar,
    [`badge--${type}`]: !!type,
    [`badge--${size}`]: !!size,
    'is-disabled': disabled,
    [`pointer`]: !disabled && !!onClick,
  });

  return disabled ? (
    <div className={badgeClassName} style={style} data-testid={testid}>
      {children}
    </div>
  ) : (
    <div
      className={badgeClassName}
      onClick={onClick}
      style={style}
      data-testid={testid}
    >
      {children}
    </div>
  );
};

export default Badge;
