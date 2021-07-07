import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import './style.scss';
import Tooltip from '../Tooltip';
import Icon, { IconName } from '../Icon';

export type CardType =
  | 'flat'
  | 'narrow'
  | 'narrow card--flat'
  | 'user'
  | 'user-compact'
  | 'sponsors'
  | 'achievements'
  | 'achievements-full'
  | 'post'
  | 'post card--flat'
  | 'social'
  | 'gear'
  | 'now-playing'
  | 'history'
  | 'store'
  | 'game'
  | 'experience'
  | 'experience-summary'
  | 'squad'
  | 'schedule'
  | 'banner';

export enum CardTypeEnum {
  FLAT = 'flat',
  NARROW = 'narrow',
  NARROW_FLAT = 'narrow card--flat',
  USER = 'user',
  USER_COMPACT = 'user-compact',
  SPONSORS = 'sponsors',
  ACHIEVEMENTS = 'achievements',
  ACHIEVEMENTS_FULL = 'achievements-full',
  POST = 'post',
  POST_FLAT = 'post card--flat',
  SOCIAL = 'social',
  GEAR = 'gear',
  NOW_PLAYING = 'now-playing',
  HISTORY = 'history',
  STORE = 'store',
  GAME = 'game',
  EXPERIENCE = 'experience',
  SQUAD = 'squad',
  SCHEDULE = 'schedule',
  BANNER = 'banner',
}

export interface CardProps {
  type?: CardType;
  children?: ReactNode;
  isOwner?: boolean;
  to?: string;
  className?: string;
  editIcon?: IconName;
  onEdit?: () => void;
}

const Card: React.FC<CardProps & React.HTMLProps<HTMLDivElement>> = ({
  type,
  children,
  to,
  isOwner = false,
  className,
  editIcon = 'icon-pencil',
  onEdit,
  ...props
}: CardProps): JSX.Element => {
  const history = useHistory();
  const cardStyle = cn('card', {
    [`${className}`]: !!className,
    [`card--${type}`]: !!type,
    [`card--hover`]: !!to && type === CardTypeEnum.POST,
  });

  const handleClickEdit = React.useCallback(() => {
    if (onEdit) onEdit();
  }, [onEdit]);

  const handleCardClick = React.useCallback(() => {
    if (to) history.push(to);
  }, [to, history]);

  return (
    <div className={cardStyle} {...props} onClick={handleCardClick}>
      {children}
      {isOwner && (
        <div className="card__edit-corner" onClick={handleClickEdit}>
          <Tooltip text="Edit card content" position="bottom-left">
            <button
              className="button button--square button--very-small button--subtle"
              data-testid="card-edit"
            >
              <Icon name={editIcon} />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default React.memo(Card);
